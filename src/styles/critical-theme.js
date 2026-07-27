const EARLY_COLORS = {
  latte: {
    page: "#e6e9ef",
    surface: "#eff1f5",
    text: "#4c4f69",
  },
  frappe: {
    page: "#292c3c",
    surface: "#303446",
    text: "#c6d0f5",
  },
  macchiato: {
    page: "#1e2030",
    surface: "#24273a",
    text: "#cad3f5",
  },
  mocha: {
    page: "#181825",
    surface: "#1e1e2e",
    text: "#cdd6f4",
  },
};

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

const flavorRules = Object.keys(EARLY_COLORS).map(createEarlyFlavorRule).join("\n");

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
`;
