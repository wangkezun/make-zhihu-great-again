import { CARD_FRAME_STYLE } from "../../../shared/surfaces.js";

export const RING_HOST_FEED_STYLE = `  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .List {
    background-color: transparent !important;
    padding-top: 12px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .List
    > .List-item {
    box-sizing: border-box !important;
    margin-bottom: 12px !important;
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .List
    > .List-item:is(:hover, :focus-within) {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .List
    > .List-item::after {
    display: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .App-main
    > div:first-child
    > div:first-child
    .PinToolbar-actions {
    background-color: transparent !important;
    border-top: 0 !important;
  }

`;
