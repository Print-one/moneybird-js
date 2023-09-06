/*eslint sort-keys-fix/sort-keys-fix: "warn"*/

module.exports = {
  scripts: {
    build: ["bsm clean", "tsc --project tsconfig.build.json"],
    clean: "rimraf ./lib",
    format: {
      _default: "bsm ~.*",
      eslint: "eslint --fix .",
      packageJson: "prettier-package-json --write",
      prettier: "prettier --write .",
    },
    lint: {
      _default: "bsm ~.*",
      eslint: "eslint .",
      prettier: "prettier -c .",
    },
  },
};
