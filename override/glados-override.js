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

  config['rule-providers']['OpenAI'] = {
    url: "https://raw.githubusercontent.com/leeyorke/rules/refs/heads/main/rulesets/openai.list",
    path: "./ruleset/openai.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['Google'] = {
    url: "https://raw.githubusercontent.com/leeyorke/rules/refs/heads/main/rulesets/google.list",
    path: "./ruleset/google.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['Gemini'] = {
    url: "https://raw.githubusercontent.com/leeyorke/rules/refs/heads/main/rulesets/gemini.list",
    path: "./ruleset/gemini.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  // ===== 添加规则（插入到最前面） =====
  config.rules.unshift("DOMAIN-KEYWORD,huggingface,Default Proxy");
  config.rules.unshift("DOMAIN-SUFFIX,zenmux.ai,Default Proxy");
  config.rules.unshift("RULE-SET,Google,Default Proxy");
  config.rules.unshift("RULE-SET,Gemini,Default Proxy");
  config.rules.unshift("RULE-SET,OpenAI,Default Proxy");
  config.rules.unshift("RULE-SET,Copilot,Default Proxy");
  config.rules.unshift("RULE-SET,Media,Default Proxy");

  return config;
}