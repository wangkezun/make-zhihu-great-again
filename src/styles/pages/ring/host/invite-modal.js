import { PRIMARY_BORDER_FOCUS_STYLE, PRIMARY_BUTTON_STYLE } from "../../../shared/actions.js";
import {
  CARD_FRAME_STYLE,
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  SECTION_HEADER_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../../../shared/surfaces.js";

export const RING_HOST_INVITE_MODAL_STYLE = `  html[data-zb-theme][data-zb-ring-host-page="true"]
    div:has(> .Modal-content input[placeholder="搜索你想邀请的人"]) {
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"]) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :first-child {${SECTION_HEADER_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :first-child
    > div
    > :first-child {
    color: var(--zb-text) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    .Input-wrapper {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    .Input-wrapper:focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    input[placeholder="搜索你想邀请的人"] {${TRANSPARENT_TEXT_STYLE}
    caret-color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    input[placeholder="搜索你想邀请的人"]::placeholder {
    color: var(--zb-text-subtle) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(2):has(button)
    > div
    > div
    > div {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :first-child {
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :first-child
    > :is(:first-child, :last-child) {
    color: var(--zb-text-secondary) !important;
    transition:
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :first-child
    > :is(:first-child, :last-child)
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :first-child
    > :is(:first-child, :last-child):is(:hover, :focus-within) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(3) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(3)
    :where(a, div, span) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(3)
    > div
    > div
    > div {
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    > div
    > :nth-child(2)
    > :nth-child(3)
    img {
    border: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    button {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid transparent !important;
    border-radius: 999px !important;
    color: var(--zb-primary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    button:is(:hover, :focus-visible) {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .Modal-content:has(input[placeholder="搜索你想邀请的人"])
    button:disabled {
    background-color: var(--zb-surface-hover) !important;
    border-color: transparent !important;
    color: var(--zb-text-subtle) !important;
    cursor: not-allowed !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    div:has(> div > .Modal-content input[placeholder="搜索你想邀请的人"])
    > button[aria-label="关闭"] {
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 999px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    div:has(> div > .Modal-content input[placeholder="搜索你想邀请的人"])
    > button[aria-label="关闭"]:is(:hover, :focus-visible) {
    background-color: color-mix(in srgb, var(--zb-danger) 14%, var(--zb-surface-raised)) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    div:has(> div > .Modal-content input[placeholder="搜索你想邀请的人"])
    > button[aria-label="关闭"]:focus-visible {
    outline: 0 !important;
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--zb-danger) 22%, transparent) !important;
  }
`;
