module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "jsx-a11y",
    "prettier",
    "import",
    "react-hooks",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        "semi": true,
        "singleQuote": true,
        "tabWidth": 2,
        "trailingComma": "es5",
        "useTabs": false,
        "endOfLine": "auto"
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }],
    "no-console": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
