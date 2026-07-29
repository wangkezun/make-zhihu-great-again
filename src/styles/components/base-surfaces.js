import { SURFACE_TEXT_STYLE } from "../shared/surfaces.js";

export const BASE_SURFACES_COMPONENT_STYLE = `  html[data-zb-theme] .Card,
  html[data-zb-theme] .TopstoryItem,
  html[data-zb-theme] .Topstory-mainColumnCard,
  html[data-zb-theme] .Topstory-mainColumnCard > div,
  html[data-zb-theme] .WriteArea,
  html[data-zb-theme] .HotSearchCard,
  html[data-zb-theme] .CreatorEntrance,
  html[data-zb-theme] .KfeCollection-CreateSaltCard,
  html[data-zb-theme] .Modal-inner,
  html[data-zb-theme] .Popover-content,
  html[data-zb-theme] .Menu,
  html[data-zb-theme] .Dropdown-menu,
  html[data-zb-theme] .Select-list,
  html[data-zb-theme] .AutoComplete-menu {
    ${SURFACE_TEXT_STYLE}
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] :is(.Card, .HotSearchCard) {
    box-sizing: border-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
  }

`;

export const SECONDARY_SURFACES_COMPONENT_STYLE = `  html[data-zb-theme] .ProfileSideCreator-analytics,
  html[data-zb-theme] .KfeCollection-CreateSaltCard-content {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

`;
