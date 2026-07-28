import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["coverage/**", "dist/**", "node_modules/**"],
  },
  eslint.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        GM_getValue: "readonly",
        GM_registerMenuCommand: "readonly",
        GM_setValue: "readonly",
        GM_unregisterMenuCommand: "readonly",
        window: "readonly",
      },
    },
  },
  {
    files: [
      "rollup.config.js",
      "vitest.config.js",
      "scripts/**/*.js",
      "scripts/**/*.mjs",
      "test/**/*.js",
    ],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        URL: "readonly",
      },
    },
  },
  prettier,
];
