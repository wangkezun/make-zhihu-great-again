import { flavors } from "@catppuccin/palette";
import { describe, expect, it } from "vitest";

import { EARLY_COLORS, FLAVOR_NAMES, PALETTE_HEX } from "../src/styles/catppuccin-palette.js";

describe("Catppuccin palette adapter", () => {
  it("derives the full and critical theme colors from the official palette", () => {
    expect(FLAVOR_NAMES).toEqual(["latte", "frappe", "macchiato", "mocha"]);

    for (const flavor of FLAVOR_NAMES) {
      const { colors } = flavors[flavor];
      const expectedPalette = Object.entries(colors)
        .map(([name, color]) => `${name}:${color.hex}`)
        .join(",");

      expect(PALETTE_HEX[flavor]).toBe(expectedPalette);
      expect(EARLY_COLORS[flavor]).toEqual({
        page: colors.mantle.hex,
        surface: colors.base.hex,
        text: colors.text.hex,
      });
    }
  });
});
