export const CONFIRMATION_DIALOG_OVERLAY_STYLE = `  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    ) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:first-child
    :where(h1, h2, h3, p, div, span, label) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:first-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    > div:first-child,
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    > div:first-child
    :where(div, span, label) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    a {
    color: var(--zb-primary) !important;
  }

`;
