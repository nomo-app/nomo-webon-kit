const nomoCliConfig = {
  deployTargets: {
    production: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/app.nomo.demowebon/",
        publicBaseUrl: "https://w.nomo.app/app.nomo.demowebon",
      },
    },
  },
};

module.exports = nomoCliConfig;
