export const REFERENCE_MODAL_OVERLAY_STYLE = `  html[data-zb-theme] .ReferenceModal :is(.InputLike, .Select-button) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .ReferenceModal
    :is(.InputLike, .Select-button):is(:hover, :focus, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
  }

`;
