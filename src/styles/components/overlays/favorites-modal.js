import { PRIMARY_BUTTON_HOVER_STYLE, RAISED_MUTED_CONTROL_STYLE } from "../../shared/actions.js";
import { THIN_SCROLLBAR_STYLE } from "../../shared/content.js";
import { RAISED_TEXT_STYLE } from "../../shared/surfaces.js";

export const FAVORITES_MODAL_OVERLAY_STYLE = `  html[data-zb-theme] .FavlistsModal .Modal-inner {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .FavlistsModal :is(.Modal-title, .Favlists-itemNameText) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Modal-subtitle, .Favlists-itemContent, .Favlists-itemIcon) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-items {${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme] .FavlistsModal .Favlists-item {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 8px 10px !important;
    background-color: transparent !important;
    border-bottom-color: var(--zb-border) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-item:is(:hover, :focus-within) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemInner {
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemName {
    min-width: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemNameText {
    min-width: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-updateButton {
    flex: 0 0 76px !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-updateButton.Button--blue,
  html[data-zb-theme] .FavlistsModal .Favlists-addButton {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Favlists-updateButton.Button--blue, .Favlists-addButton):hover {
    ${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme] .FavlistsModal .Favlists-actions {
    background-color: var(--zb-surface) !important;
    border-top-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .FavlistsModal .Modal-closeButton {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Modal-closeButton:is(:hover, :focus-visible) {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-updateButton.Button--grey {
    position: relative !important;
    border-radius: 6px !important;
    ${RAISED_MUTED_CONTROL_STYLE}
  }

  html[data-zb-theme]
    body
    .FavlistsModal
    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }

  html[data-zb-theme]
    body
    .FavlistsModal
    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible)::after {
    content: "取消收藏" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
    font-size: 14px !important;
    line-height: normal !important;
  }

  html[data-zb-theme]
    body
    .FavlistsModal
    .Favlists-updateButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
  }

`;
