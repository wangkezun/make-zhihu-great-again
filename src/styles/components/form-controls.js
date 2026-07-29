export const FORM_CONTROLS_COMPONENT_STYLE = `  html[data-zb-theme] .SearchBar-input,
  html[data-zb-theme] .Input-wrapper,
  html[data-zb-theme] input,
  html[data-zb-theme] textarea,
  html[data-zb-theme] select,
  html[data-zb-theme] [contenteditable="true"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] input::placeholder,
  html[data-zb-theme] textarea::placeholder,
  html[data-zb-theme] [contenteditable="true"]:empty::before {
    color: var(--zb-text-subtle) !important;
  }

`;
