require('dotenv').config();

const sshHost = process.env.SSH_TARGET_DEV_WEBON;
if (!sshHost) {
  throw new Error("SSH_TARGET_DEV_WEBON not set");
}

const nomoCliConfig = {
  deployTargets: {
    production: {
      rawSSH: {
        sshHost,
        sshBaseDir: "/var/www/html",
        publicBaseUrl: "https://demowebon.nomo.zone",
        hybrid: true,
      },
    }
  },
};

module.exports = nomoCliConfig;
