module.exports = {
  extends: ["../../.eslintrc.js"],
  rules: {
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-floating-promises": "error",
    // TODO: Remove this once ts errors sorted
    "@typescript-eslint/ban-ts-comment": "off",
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
  },
}
