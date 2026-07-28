import { nodeResolve } from "@rollup/plugin-node-resolve";
import { flavors as catppuccinFlavors } from "@catppuccin/palette";
import { fileURLToPath, URL } from "node:url";

import packageJson from "./package.json" with { type: "json" };

const catppuccinFlavorNames = ["latte", "frappe", "macchiato", "mocha"];
const catppuccinPaletteModulePath = fileURLToPath(
  new URL("./src/styles/catppuccin-palette.js", import.meta.url),
);

const catppuccinPaletteHex = () => ({
  name: "catppuccin-palette-hex",
  load(id) {
    if (id !== catppuccinPaletteModulePath) return null;

    const packedPalettes = Object.fromEntries(
      catppuccinFlavorNames.map((flavor) => [
        flavor,
        Object.entries(catppuccinFlavors[flavor].colors)
          .map(([name, color]) => `${name}:${color.hex}`)
          .join(","),
      ]),
    );
    const earlyColors = Object.fromEntries(
      catppuccinFlavorNames.map((flavor) => {
        const { colors } = catppuccinFlavors[flavor];
        return [
          flavor,
          {
            page: colors.mantle.hex,
            surface: colors.base.hex,
            text: colors.text.hex,
          },
        ];
      }),
    );

    return `
      export const FLAVOR_NAMES = ${JSON.stringify(catppuccinFlavorNames)};
      export const PALETTE_HEX = ${JSON.stringify(packedPalettes)};
      export const EARLY_COLORS = ${JSON.stringify(earlyColors)};
    `;
  },
});

const userscriptMetadata = `// ==UserScript==
// @name         Make Zhihu Great Again
// @namespace    https://github.com/wangkezun/make-zhihu-great-again
// @version      ${packageJson.version}
// @description  改善知乎的视觉、交互、性能与隐私体验
// @match        https://www.zhihu.com/*
// @run-at       document-start
// @early-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        unsafeWindow
// ==/UserScript==`;

export default {
  input: "src/index.js",
  plugins: [catppuccinPaletteHex(), nodeResolve()],
  output: {
    banner: userscriptMetadata,
    file: "dist/Make-Zhihu-Great-Again.user.js",
    format: "iife",
    generatedCode: "es2015",
    name: "MakeZhihuGreatAgain",
    sourcemap: false,
  },
};
