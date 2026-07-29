import { PRIMARY_BORDER_FOCUS_STYLE, SOFT_PRIMARY_STATE_STYLE } from "../../shared/actions.js";
import {
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  SURFACE_TEXT_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../../shared/surfaces.js";

export const POLL_OVERLAYS_STYLE = `  html[data-zb-theme] .VoteTypeSelectorPopover,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:hover,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:focus,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:focus-within {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .CommentSetting-submenuBox,
  html[data-zb-theme] .RingSetting-submenuBox {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme] .CommentSetting-submenuBox > div:hover,
  html[data-zb-theme] .CommentSetting-submenuBox > div:focus,
  html[data-zb-theme] .CommentSetting-submenuBox > div:focus-within {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox .ZDI--Check24 {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child,
  html[data-zb-theme] .RingSetting-submenuBox > div:nth-child(3) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child > div:first-child,
  html[data-zb-theme] .RingSetting-submenuBox > div:nth-child(3) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child svg {
    color: var(--zb-text-muted) !important;
    fill: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper:focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper input {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img) {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img):hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:first-child
    > div:first-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:last-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:last-child {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme]
    .VoteTypeSelectorPopover
    > div
    > div
    > div:first-child
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .VoteTypeSelectorPopover
    > div
    > div
    > div:last-child:not(:first-child) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:first-child {
    background-color: transparent !important;
    border: 0 !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    div:has(> input[type="text"]) {
    box-sizing: border-box !important;
    min-width: 0 !important;
    padding: 0 10px !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 4px !important;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    div:has(> input[type="text"]):focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    input[type="text"] {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    outline: 0 !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    input[type="text"]::placeholder {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child
    div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child
    svg {
    color: var(--zb-text-muted) !important;
    fill: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    div:has(> div > input[placeholder^="请填写选项"])
    > div:first-child {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    div:has(> div > input[placeholder^="请填写选项"])
    > div:first-child
    div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div) {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div):hover {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div)
    :where(svg, div) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-poll-modal-open="true"]
    [data-zb-poll-option-popover] {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    scrollbar-color: var(--ctp-overlay0) transparent;
  }

  html[data-zb-theme][data-zb-poll-modal-open="true"]
    [data-zb-poll-option-popover]
    > svg {
    color: var(--zb-surface) !important;
    fill: var(--zb-surface) !important;
  }

  html[data-zb-theme][data-zb-poll-modal-open="true"]
    [data-zb-poll-option-popover]
    > svg
    + div
    > div {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-poll-modal-open="true"]
    [data-zb-poll-option-popover]
    > svg
    + div
    > div:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }`;
