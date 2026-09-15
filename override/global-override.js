function main(config) {
  // ===== 添加 rule-providers =====
  if (!config['rule-providers']) {
    config['rule-providers'] = {};
  }

  config['rule-providers']['BilibiliHMT'] = {
    url: "https://testingcf.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/BilibiliHMT.list",
    path: "./ruleset/BilibiliHMT.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['Bilibili'] = {
    url: "https://testingcf.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/Bilibili.list",
    path: "./ruleset/Bilibili.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['ChinaMedia'] = {
    url: "https://testingcf.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaMedia.list",
    path: "./ruleset/ChinaMedia.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['ChinaDomain'] = {
    url: "https://testingcf.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaDomain.list",
    path: "./ruleset/ChinaDomain.list",
    behavior: "domain",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['ChinaCompanyIp'] = {
    url: "https://testingcf.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaCompanyIp.list",
    path: "./ruleset/ChinaCompanyIp.list",
    behavior: "ipcidr",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['Direct'] = {
    url: "https://raw.githubusercontent.com/leeyorke/rules/refs/heads/main/rulesets/direct.list",
    path: "./ruleset/Direct.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  config['rule-providers']['Reject'] = {
    url: "https://raw.githubusercontent.com/leeyorke/rules/refs/heads/main/rulesets/reject.list",
    path: "./ruleset/Reject.list",
    behavior: "classical",
    interval: 86400,
    format: "text",
    type: "http",
  };

  // ===== 添加规则（插入到最前面） =====
  config.rules.unshift("GEOIP,CN,DIRECT");
  config.rules.unshift("RULE-SET,ChinaCompanyIp,DIRECT");
  config.rules.unshift("RULE-SET,ChinaDomain,DIRECT");
  config.rules.unshift("RULE-SET,ChinaMedia,DIRECT");
  config.rules.unshift("RULE-SET,Bilibili,DIRECT");
  config.rules.unshift("RULE-SET,BilibiliHMT,DIRECT");
  config.rules.unshift("RULE-SET,Reject,REJECT");
  config.rules.unshift("RULE-SET,Direct,DIRECT");
  config.rules.unshift("DOMAIN,dns.msftncsi.com,DIRECT");
  config.rules.unshift("DOMAIN,www.msftconnecttest.com,DIRECT");
  config.rules.unshift("DOMAIN-SUFFIX,msftncsi.com,DIRECT");
  config.rules.unshift("DOMAIN-SUFFIX,msftconnecttest.com,DIRECT");

  return config;
}