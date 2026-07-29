import { RAISED_TEXT_STYLE, SURFACE_TEXT_ONLY_STYLE } from "../shared/surfaces.js";

export const APP_HEADER_COMPONENT_STYLE = `  html[data-zb-theme] .AppHeader,
  html[data-zb-theme] .AppHeader-inner,
  html[data-zb-theme] .Sticky.is-fixed {${SURFACE_TEXT_ONLY_STYLE}
    border-color: var(--zb-border) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .AppHeader a,
  html[data-zb-theme] .AppHeader button,
  html[data-zb-theme] .AppHeader svg,
  html[data-zb-theme] .AppHeader-Tabs a {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .AppHeader a:hover,
  html[data-zb-theme] .AppHeader button:hover,
  html[data-zb-theme] .AppHeader-Tab--active a,
  html[data-zb-theme] .AppHeader-Tabs a[aria-current="page"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-searchButton
    .SearchBar-searchIcon {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-searchButton
    .SearchBar-searchIcon.isFocus {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-input--focus
    .SearchBar-searchButton {
    background-color: transparent !important;
    border-color: transparent !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-askDropdownButton
    .ZDI--PlusFill24 {
    color: var(--ctp-crust) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .SearchBar-menu .Menu-item:hover,
  html[data-zb-theme] .SearchBar-menu .Menu-item.is-active,
  html[data-zb-theme] .SearchBar-menu .Menu-item:focus,
  html[data-zb-theme] .SearchBar-menu .Menu-item:focus-within {${RAISED_TEXT_STYLE}
  }

`;
