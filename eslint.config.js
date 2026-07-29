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
    files: ["src/styles/components/**/*.js", "src/styles/pages/**/*.js"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "../shared-components.js",
              message: "请直接依赖 shared/actions、content、feedback 或 surfaces 模块。",
            },
          ],
        },
      ],
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
