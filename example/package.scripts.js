module.exports = {
  scripts: {
    start: {
      _default: "bsm buildLib start._",
      _: "env-cmd -f ./.env node ./example.js",
    },
    buildLib: "cd ../ && npm run build",
  },
};
