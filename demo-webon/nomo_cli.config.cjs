const nomoCliConfig = {
  deployTargets: {
    production1: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/demowebon/",
        publicBaseUrl: "https://w.nomo.app/demowebon",
        hybrid: true,
      },
    },
    production2: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/devwebon/",
        publicBaseUrl: "https://w.nomo.app/devwebon",
        hybrid: true,
      },
    },
  },
};

module.exports = nomoCliConfig;
