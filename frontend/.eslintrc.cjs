module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: [
      'tsconfig.json',
      'tsconfig.node.json',
      'tsconfig.app.json'
    ],
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts", "postcss.config.js", "tailwind.config.js"],
  plugins: ["react", "@typescript-eslint", "react-refresh"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/jsx-filename-extension": [
      1,
      { "extensions": [".js", ".jsx", ".ts", ".tsx"] }
    ],
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ]
  }
};
