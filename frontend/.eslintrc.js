module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "ESNEXT",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react/prop-types": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  ignorePatterns: ["**/*.generated.ts"],
  overrides: [
    // we want to name our queries for readability but it doesn't need the variable to be used
    {
      files: ["**/*/queries.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": 0,
      },
    },
  ],
};
