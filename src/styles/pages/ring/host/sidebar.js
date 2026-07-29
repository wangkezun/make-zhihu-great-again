import {
  PRIMARY_BORDER_FOCUS_STYLE,
  PRIMARY_BUTTON_HOVER_STYLE,
  PRIMARY_BUTTON_STYLE,
  PRIMARY_FOCUS_STYLE,
} from "../../../shared/actions.js";
import { CURRENT_COLOR_ICON_STYLE } from "../../../shared/content.js";
import { CARD_FRAME_STYLE, RAISED_CONTROL_SURFACE_STYLE } from "../../../shared/surfaces.js";

export const RING_HOST_SIDEBAR_STYLE = `  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child,
  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div {
    box-sizing: border-box !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div {
    padding: 16px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2) {
    gap: 16px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child {
    min-height: 214px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div {
    padding-top: 20px !important;
    gap: 16px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)::before {
    display: none !important;
    content: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child {
    padding: 16px 12px !important;
    gap: 12px !important;
    margin-bottom: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > :first-child {
    flex: 0 0 auto !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > div:nth-child(2) {
    box-sizing: border-box !important;
    display: flex !important;
    width: auto !important;
    min-width: 0 !important;
    min-height: 36px !important;
    flex: 1 1 auto !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: var(--zb-primary) !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 999px !important;
    color: var(--ctp-crust) !important;
    cursor: pointer !important;
    transition: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > div:nth-child(2)
    :where(div, span, svg) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > div:nth-child(2):hover {
    ${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"][data-zb-ring-host-ready="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:first-child
    > div:nth-child(2) {
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    > :first-child {
    margin-bottom: 12px !important;
    color: var(--zb-text) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    > :first-child
    > :last-child:not(:only-child) {
    color: var(--zb-primary) !important;
    font-weight: 400 !important;
    transition:
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    > :first-child
    > :last-child:not(:only-child):is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2) {
    margin-top: 0 !important;
    padding: 12px !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :first-child
    > :first-child
    > :nth-child(odd) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :first-child
    > :first-child
    > :nth-child(even) {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :first-child
    > :nth-child(2) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :nth-child(2) {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid transparent !important;
    color: var(--zb-primary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :nth-child(2)
    :where(div, span, svg) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:first-child
    > :nth-child(2)
    > :nth-child(2):is(:hover, :focus-visible) {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(2)
    > :nth-child(2) {
    color: var(--zb-text-secondary) !important;
    line-height: 1.65 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :is(:nth-child(2), :nth-child(3))
    > :first-child {
    color: var(--zb-text-muted) !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(2)
    a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(2)
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
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(2)
    button:is(:hover, :focus-visible) {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(3)
    img {
    border: 1px solid var(--zb-border) !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div:nth-child(3)
    > :nth-child(3)
    a:is(:hover, :focus-visible)
    img {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    a:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:nth-child(2)
    > div
    > div:nth-child(2)
    > div
    a:focus-visible {
    border-radius: 6px !important;
    ${PRIMARY_FOCUS_STYLE}
  }

`;
