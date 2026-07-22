import { nodeResolve } from "@rollup/plugin-node-resolve";

import packageJson from "./package.json" with { type: "json" };

const userscriptMetadata = `// ==UserScript==
// @name         知乎美化 v5
// @namespace    https://github.com/wangkezun/zhihu-beautification
// @version      ${packageJson.version}
// @description  提供可自由开关的知乎页面美化功能
// @match        https://www.zhihu.com/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==`;

export default {
  input: "src/index.js",
  plugins: [nodeResolve()],
  output: {
    banner: userscriptMetadata,
    file: "dist/Zhihu-Beautification.user.js",
    format: "iife",
    generatedCode: "es2015",
    name: "ZhihuBeautification",
    sourcemap: false,
  },
};
