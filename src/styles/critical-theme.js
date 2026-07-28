import { EARLY_COLORS, FLAVOR_NAMES } from "./catppuccin-palette.js";

const createEarlyFlavorRule = (name) => {
  const colors = EARLY_COLORS[name];
  return `
  html[data-zb-theme="${name}"] {
    --zb-early-page: ${colors.page};
    --zb-early-surface: ${colors.surface};
    --zb-early-text: ${colors.text};
    color-scheme: ${name === "latte" ? "light" : "dark"};
  }`;
};

const flavorRules = FLAVOR_NAMES.map(createEarlyFlavorRule).join("\n");

export const CRITICAL_THEME_STYLE = `
${flavorRules}

  html[data-zb-theme="system"] {
    --zb-early-page: ${EARLY_COLORS.latte.page};
    --zb-early-surface: ${EARLY_COLORS.latte.surface};
    --zb-early-text: ${EARLY_COLORS.latte.text};
    color-scheme: light;
  }

  @media (prefers-color-scheme: dark) {
    html[data-zb-theme="system"] {
      --zb-early-page: ${EARLY_COLORS.mocha.page};
      --zb-early-surface: ${EARLY_COLORS.mocha.surface};
      --zb-early-text: ${EARLY_COLORS.mocha.text};
      color-scheme: dark;
    }
  }

  html[data-zb-theme],
  html[data-zb-theme] body,
  html[data-zb-theme] #root,
  html[data-zb-theme] .App-main,
  html[data-zb-theme] .Search-container,
  html[data-zb-theme] .SearchMain {
    background-color: var(--zb-early-page) !important;
    color: var(--zb-early-text) !important;
  }

  html[data-zb-theme] .SearchMain > div,
  html[data-zb-theme] .SearchMain > div > div {
    background-color: var(--zb-early-surface) !important;
    color: var(--zb-early-text) !important;
  }

  html[data-zb-theme][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card,
  html[data-zb-theme][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div,
  html[data-zb-theme][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > div,
  html[data-zb-theme][data-zb-creator-associated-account-page="true"]
    .Creator-mainColumn
    > .Card
    > div
    > div
    > div:first-child
    .Sticky {
    background-color: var(--zb-early-surface) !important;
    border-color: var(--zb-early-page) !important;
    color: var(--zb-early-text) !important;
  }
`;
