function main(config) {
  // ===== 添加 rule-providers =====
  if (!config['rule-providers']) {
    config['rule-providers'] = {};
  }

  // ===== 添加规则（插入到最前面） =====
  config.rules.unshift("MATCH,🐟 漏网之鱼");

  return config;
}