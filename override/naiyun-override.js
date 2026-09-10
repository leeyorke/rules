function main(config) {
  // ===== 添加 rule-providers =====
  if (!config['rule-providers']) {
    config['rule-providers'] = {};
  }

  config['rule-providers']['Copilot'] = {
    url: "https://raw.githubusercontent.com/leeyorke/rules/refs/heads/main/rulesets/copilot.list",
    path: "./ruleset/copilot.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['Media'] = {
    url: "https://raw.githubusercontent.com/leeyorke/rules/refs/heads/main/rulesets/Inter-media.list",
    path: "./ruleset/Inter-media.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  // ===== 添加规则（插入到最前面） =====
  config.rules.unshift("RULE-SET,Media,🌍 国外媒体");
  config.rules.unshift("RULE-SET,Copilot,🤖 AI服务");

  return config;
}