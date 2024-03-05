require('dotenv').config();

const mnemonic = process.env.CACHE_SIGN_MNEMONIC;
if (!mnemonic) {
  throw new Error("Please configure a CACHE_SIGN_MNEMONIC in a .env file");
}

const nomoCliConfig = {
  deployTargets: {
    production1: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/demowebon/",
        publicBaseUrl: "https://w.nomo.app/demowebon",
        hybrid: true,
        mnemonic,
      },
    },
    production2: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/devwebon/",
        publicBaseUrl: "https://w.nomo.app/devwebon",
        hybrid: true,
        mnemonic,
      },
    },
  },
};

module.exports = nomoCliConfig;
