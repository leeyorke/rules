#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import yaml

from pathlib import Path
from typing import Optional


def convert_yaml_to_js(yaml_content: str) -> str:
    data = yaml.safe_load(yaml_content)

    rule_providers = data.get("rule-providers", {})
    rules = data.get("+rules") or data.get("rules") or []

    js_lines = []
    js_lines.append("function main(config) {")
    js_lines.append("  // ===== 添加 rule-providers =====")
    js_lines.append("  if (!config['rule-providers']) {")
    js_lines.append("    config['rule-providers'] = {};")
    js_lines.append("  }")
    js_lines.append("")

    # 写入 rule-providers
    for name, provider in rule_providers.items():
        js_lines.append(f"  config['rule-providers']['{name}'] = {{")
        for key, value in provider.items():
            if isinstance(value, str):
                js_lines.append(f'    {key}: "{value}",')
            else:
                js_lines.append(f"    {key}: {value},")
        js_lines.append("  };")
        js_lines.append("")

    # 写入 rules（倒序 unshift，保证顺序和优先级正确）
    js_lines.append("  // ===== 添加规则（插入到最前面） =====")
    if rules:
        for rule in reversed(rules):
            js_lines.append(f'  config.rules.unshift("{rule}");')
    else:
        js_lines.append("  // 没有规则需要添加")

    js_lines.append("")
    js_lines.append("  return config;")
    js_lines.append("}")

    return "\n".join(js_lines)


def convert_file(
    input_file: Path, output_file: Optional[Path], stdout: bool = False
) -> None:
    """转换单个 YAML 文件"""
    yaml_content = input_file.read_text(encoding="utf-8")
    js_code = convert_yaml_to_js(yaml_content)

    if stdout:
        print(f"// ===== 来自文件: {input_file} =====")
        print(js_code)
        print()
        return

    if output_file is None:
        output_file = input_file.with_suffix(".js")

    output_file.write_text(js_code, encoding="utf-8")
    print(f"✓ 已转换: {input_file} → {output_file}")


def main():
    parser = argparse.ArgumentParser(
        description="把 Clash 覆写 YAML 转换成传统写法的 JS 脚本",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""使用示例:
  # 转换单个文件
  python yaml2js.py override.yaml
  python yaml2js.py override.yaml -o custom.js
  python yaml2js.py override.yaml --stdout

  # 批量转换整个文件夹
  python yaml2js.py -d ./overrides
  python yaml2js.py -d ./overrides -o ./js_output
  python yaml2js.py -d ./overrides --stdout
""",
    )

    # 互斥组：要么指定单个文件，要么指定文件夹
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "input", type=str, nargs="?", help="输入的单个覆写 YAML 文件路径"
    )
    group.add_argument(
        "-d",
        "--dir",
        type=str,
        help="输入文件夹路径，将转换该文件夹下所有 .yaml / .yml 文件",
    )

    parser.add_argument(
        "-o",
        "--output",
        type=str,
        default=None,
        help="输出路径。单文件时为输出文件名；文件夹时为输出目录（默认与源文件同目录）",
    )
    parser.add_argument(
        "--stdout", action="store_true", help="直接打印到终端，不写文件"
    )
    parser.add_argument(
        "--recursive",
        "-r",
        action="store_true",
        help="递归处理子文件夹中的 yaml 文件（仅在 -d 模式下有效）",
    )

    args = parser.parse_args()

    # ---------- 处理文件夹模式 ----------
    if args.dir:
        input_dir = Path(args.dir)
        if not input_dir.is_dir():
            print(f"错误: 文件夹不存在 → {input_dir}")
            exit(1)

        # 查找所有 yaml/yml 文件
        pattern = "**/*" if args.recursive else "*"
        yaml_files = list(input_dir.glob(f"{pattern}.yaml")) + list(
            input_dir.glob(f"{pattern}.yml")
        )

        if not yaml_files:
            print(f"在文件夹 {input_dir} 中没有找到任何 .yaml / .yml 文件")
            exit(0)

        print(f"找到 {len(yaml_files)} 个 YAML 文件，开始转换...\n")

        output_dir = Path(args.output) if args.output else None
        if output_dir and not args.stdout:
            output_dir.mkdir(parents=True, exist_ok=True)

        for yaml_file in yaml_files:
            if args.stdout:
                convert_file(yaml_file, output_file=None, stdout=True)
            else:
                if output_dir:
                    # 保持相对路径结构
                    relative = yaml_file.relative_to(input_dir)
                    out_file = output_dir / relative.with_suffix(".js")
                    out_file.parent.mkdir(parents=True, exist_ok=True)
                else:
                    out_file = yaml_file.with_suffix(".js")

                convert_file(yaml_file, out_file)

        print(f"\n全部完成！共转换 {len(yaml_files)} 个文件。")
        return

    # ---------- 处理单个文件模式 ----------
    input_file = Path(args.input)
    if not input_file.exists():
        print(f"错误: 文件不存在 → {input_file}")
        exit(1)

    output_file = Path(args.output) if args.output else None
    convert_file(input_file, output_file, stdout=args.stdout)

    if not args.stdout:
        print("=" * 50)
        print("转换成功！")


if __name__ == "__main__":
    main()
