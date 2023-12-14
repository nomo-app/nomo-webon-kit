const nomoCliConfig = {
  deployTargets: {
    production: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/demowebon/",
        publicBaseUrl: "https://w.nomo.app/demowebon",
      },
    },
  },
};

module.exports = nomoCliConfig;
