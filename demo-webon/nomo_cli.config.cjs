require('dotenv').config();

const sshHost = process.env.SSH_TARGET;
if (!sshHost) {
  throw new Error("SSH_TARGET not set");
}

const nomoCliConfig = {
  deployTargets: {
    production1: {
      rawSSH: {
        sshHost,
        sshBaseDir: "/var/www/production_webons/demowebon/",
        publicBaseUrl: "https://demowebon.nomo.zone",
        hybrid: true,
      },
    },
    production2: {
      rawSSH: {
        sshHost,
        sshBaseDir: "/var/www/production_webons/devwebon/",
        publicBaseUrl: "https://demowebon.nomo.app",
        hybrid: true,
      },
    },
  },
};

module.exports = nomoCliConfig;
