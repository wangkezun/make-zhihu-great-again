import { CURRENT_COLOR_ICON_STYLE } from "../../shared/content.js";
import {
  CARD_FRAME_STYLE,
  SECTION_HEADER_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
} from "../../shared/surfaces.js";

export const VOTER_LIST_OVERLAY_STYLE = `  html[data-zb-theme]
    div:has(> .Modal-content > .VoterList) {
    box-sizing: border-box !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Modal-content:has(> .VoterList) {
    background-color: var(--zb-surface) !important;
    border-radius: inherit !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .VoterList > .Topbar {
    ${SECTION_HEADER_STYLE}
  }

  html[data-zb-theme] .VoterList-content {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme]
    .VoterList-content
    :is(
      .Skeleton,
      [class*="skeleton" i],
      .PlaceHolder,
      .PlaceHolder-inner,
      [class*="placeholder" i],
      [class*="loading" i],
      [aria-busy="true"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .VoterList-content
    img.Avatar:is(:not([src]), [src=""]) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .VoterList-content .List-item {
    background-color: transparent !important;
    transition: background-color 0.16s ease !important;
  }

  html[data-zb-theme]
    .VoterList-content
    .List-item:is(:hover, :focus-within) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .VoterList-content .List-item::after {
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .VoterList-content
    :is(.ContentItem-title, .UserItem-title, .UserLink-link) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .VoterList-content
    :is(.ContentItem-meta, .ContentItem-statusItem) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .VoterList-content img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 50% !important;
  }

  html[data-zb-theme]
    .VoterList-content
    .FollowButton.Button--grey {
    -webkit-text-fill-color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme]
    .VoterList-content
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .VoterList-content
    .FollowButton.Button--grey:is(:hover, :focus-visible)
    :where(span, svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

`;
