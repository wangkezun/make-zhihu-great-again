export const THEME_FOUNDATION_STYLE = `  html[data-zb-theme] {
    --zb-page: var(--ctp-mantle);
    --zb-surface: var(--ctp-base);
    --zb-surface-raised: var(--ctp-surface0);
    --zb-surface-hover: var(--ctp-surface1);
    --zb-border: var(--ctp-surface0);
    --zb-border-strong: var(--ctp-surface1);
    --zb-text: var(--ctp-text);
    --zb-text-secondary: var(--ctp-subtext1);
    --zb-text-muted: var(--ctp-subtext0);
    --zb-text-subtle: var(--ctp-overlay0);
    --zb-primary: var(--ctp-blue);
    --zb-primary-hover: var(--ctp-sapphire);
    --zb-primary-soft: color-mix(in srgb, var(--ctp-blue) 16%, transparent);
    --zb-danger: var(--ctp-red);
    --zb-danger-soft: color-mix(in srgb, var(--ctp-red) 14%, transparent);
    --zb-success: var(--ctp-green);
    --zb-warning: var(--ctp-peach);
    --zb-shadow: 0 1px 3px color-mix(in srgb, var(--ctp-crust) 28%, transparent);
    background: var(--zb-page) !important;
    scrollbar-color: var(--ctp-overlay0) var(--zb-page);
  }

  html[data-zb-theme] body,
  html[data-zb-theme] #root,
  html[data-zb-theme] .App-main,
  html[data-zb-theme] .Topstory-body {
    background-color: var(--zb-page) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] ::selection {
    background: var(--ctp-lavender) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] :focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

`;
