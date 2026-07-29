import { SURFACE_TEXT_STYLE } from "../../shared/surfaces.js";

export const RESPONSIVE_MODAL_OVERLAY_STYLE = `  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    > div:first-child {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [dir="auto"] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"] {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"]:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"]
    [dir="auto"] {
    color: var(--zb-primary) !important;
  }

`;
