import { MESSAGING_COMPONENT_STYLE } from "./messaging.js";
import { ARROW_ACTION_PANEL_OVERLAY_STYLE } from "./overlays/arrow-action-panel.js";
import { FAVORITES_MODAL_OVERLAY_STYLE } from "./overlays/favorites-modal.js";
import { GIFT_MODAL_OVERLAY_STYLE } from "./overlays/gift-modal.js";
import { POLL_OVERLAYS_STYLE } from "./overlays/poll.js";
import { VOTER_LIST_OVERLAY_STYLE } from "./overlays/voter-list.js";
import { CONFIRMATION_DIALOG_OVERLAY_STYLE } from "./overlays/confirmation-dialog.js";
import { EDITOR_POPOVERS_OVERLAY_STYLE } from "./overlays/editor-popovers.js";
import { MATERIAL_LIBRARY_MODAL_OVERLAY_STYLE } from "./overlays/material-library-modal.js";
import { MEDIA_MODALS_OVERLAY_STYLE } from "./overlays/media-modals.js";
import { REFERENCE_MODAL_OVERLAY_STYLE } from "./overlays/reference-modal.js";
import { RESPONSIVE_MODAL_OVERLAY_STYLE } from "./overlays/responsive-modal.js";
import { RAISED_TEXT_STYLE } from "../shared/surfaces.js";

export const OVERLAYS_COMPONENT_STYLE = `  html[data-zb-theme] div:has(> .Modal-content) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Modal .Topbar {
    background-color: var(--zb-surface) !important;
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

${VOTER_LIST_OVERLAY_STYLE}${GIFT_MODAL_OVERLAY_STYLE}${FAVORITES_MODAL_OVERLAY_STYLE}${ARROW_ACTION_PANEL_OVERLAY_STYLE}  html[data-zb-theme] .WriteArea,
  html[data-zb-theme] .Topstory-mainColumnCard {
    background-clip: padding-box !important;
    border-radius: 12px !important;
  }

${MESSAGING_COMPONENT_STYLE}
  html[data-zb-theme] .Topstory-mainColumnCard {
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme] .TopstoryItem,
  html[data-zb-theme] .ContentItem,
  html[data-zb-theme] .List-item,
  html[data-zb-theme] .Menu-item,
  html[data-zb-theme] .Menu-divider {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] h1,
  html[data-zb-theme] h2,
  html[data-zb-theme] h3,
  html[data-zb-theme] h4,
  html[data-zb-theme] h5,
  html[data-zb-theme] h6,
  html[data-zb-theme] .ContentItem-title,
  html[data-zb-theme] .AuthorInfo-name,
  html[data-zb-theme] .RichContent,
  html[data-zb-theme] .RichText {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopstoryItem .RichContent-inner,
  html[data-zb-theme] .TopstoryItem .RichContent-inner .RichText {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .ContentItem-meta,
  html[data-zb-theme] .ContentItem-time,
  html[data-zb-theme] .AuthorInfo-badgeText,
  html[data-zb-theme] .RichContent-actions,
  html[data-zb-theme] .Button:not(.Button--blue):not(.VoteButton) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] a:hover,
  html[data-zb-theme] .ContentItem-title a:hover,
  html[data-zb-theme] .RichText a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Button:not(.Button--blue):not(.VoteButton):hover,
  html[data-zb-theme] .Menu-item:hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .Popover-content .Menu > .Menu-item {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    padding-right: 14px !important;
    padding-left: 14px !important;
    border-radius: 4px !important;
  }

  html[data-zb-theme]
    .Popover-content
    .Menu
    > .Menu-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

${EDITOR_POPOVERS_OVERLAY_STYLE}${MATERIAL_LIBRARY_MODAL_OVERLAY_STYLE}${REFERENCE_MODAL_OVERLAY_STYLE}${CONFIRMATION_DIALOG_OVERLAY_STYLE}${RESPONSIVE_MODAL_OVERLAY_STYLE}${MEDIA_MODALS_OVERLAY_STYLE}${POLL_OVERLAYS_STYLE}
`;
