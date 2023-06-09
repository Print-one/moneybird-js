/*eslint sort-keys-fix/sort-keys-fix: "warn"*/

module.exports = {
  scripts: {
    build: "nps clean && tsc --project tsconfig.build.json",
    clean: "rimraf ./lib",
    format: {
      default: "nps --prefix=format eslint prettier packageJson",
      eslint: "eslint --fix .",
      packageJson: "prettier-package-json --write",
      prettier: "prettier --write .",
    },
    lint: {
      default: "nps --prefix=lint eslint prettier",
      eslint: "eslint .",
      prettier: "prettier -c .",
    },
  },
};
