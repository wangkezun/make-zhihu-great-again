import { flavors } from "@catppuccin/palette";

export const FLAVOR_NAMES = ["latte", "frappe", "macchiato", "mocha"];

export const PALETTE_HEX = Object.fromEntries(
  FLAVOR_NAMES.map((flavor) => [
    flavor,
    Object.entries(flavors[flavor].colors)
      .map(([name, color]) => `${name}:${color.hex}`)
      .join(","),
  ]),
);

export const EARLY_COLORS = Object.fromEntries(
  FLAVOR_NAMES.map((name) => {
    const { colors } = flavors[name];
    return [
      name,
      {
        page: colors.mantle.hex,
        surface: colors.base.hex,
        text: colors.text.hex,
      },
    ];
  }),
);
