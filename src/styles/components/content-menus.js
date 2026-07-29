import { RAISED_TEXT_STYLE, SURFACE_TEXT_STYLE } from "../shared/surfaces.js";

export const CONTENT_MENUS_COMPONENT_STYLE = `  html[data-zb-theme] .Answers-select,
  html[data-zb-theme] .Answers-select .Select-option {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .Answers-select {
    min-width: 116px !important;
    padding: 4px !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .Answers-select .Select-option {
    height: 34px !important;
    min-height: 34px !important;
    padding: 0 12px !important;
    border-radius: 4px !important;
    font-size: 14px !important;
    line-height: 34px !important;
  }

  html[data-zb-theme] .Answers-select .Select-option:hover,
  html[data-zb-theme] .Answers-select .Select-option:focus,
  html[data-zb-theme] .Answers-select .Select-option:focus-visible,
  html[data-zb-theme] .Answers-select .Select-option.is-selected,
  html[data-zb-theme] .Answers-select .Select-option[aria-selected="true"] {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .ShareMenu-content,
  html[data-zb-theme] .ShareMenu-menuItems,
  html[data-zb-theme] .ShareMenu-qrcodeBox {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .ShareMenu-button {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .ShareMenu-button:hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .ShareMenu-qrcodeSection {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .ShareMenu-divider {
    background-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .ShareMenu-qrcodeText {
    color: var(--zb-text-muted) !important;
  }
`;
