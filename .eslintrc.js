/*eslint sort-keys-fix/sort-keys-fix: "warn"*/

module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  ignorePatterns: ["**/node_modules", "**/lib", "**/package-lock.json"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "no-relative-import-paths",
    "unused-imports",
    "sort-keys-fix",
  ],
  root: true,
};
