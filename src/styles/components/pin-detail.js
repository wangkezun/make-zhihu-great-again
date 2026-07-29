import { PRIMARY_BUTTON_STYLE } from "../shared/actions.js";
import { CURRENT_COLOR_ICON_STYLE } from "../shared/content.js";

export const PIN_DETAIL_COMPONENT_STYLE = `  html[data-zb-theme] .PinItem .PinToolbar-actions {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .PinDetail
    .PinItem
    a.LinkCard
    :is(.LinkCard-title.loading, .LinkCard-desc.loading) {
    background-color: var(--zb-surface-hover) !important;
    border-radius: 4px !important;
  }

  html[data-zb-theme]
    .PinDetail
    .PinItem
    .ContentItem-actions
    > .PinToolbar-actions {
    box-sizing: border-box !important;
    width: 100% !important;
    margin: -10px 0 !important;
    padding: 10px 0 !important;
    background-color: transparent !important;
    border-top: 0 !important;
  }

  html[data-zb-theme]
    body
    main
    .PinDetail
    .PinItem
    .Comments-container
    > div
    > div:has(.InputLike.Editable) {
    box-sizing: border-box !important;
    width: 100% !important;
    margin: 0 !important;
    margin-right: 0 !important;
    margin-left: 0 !important;
    padding: 10px 0 !important;
    padding-inline: 0 !important;
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .PinDetail
    .Comments-container
    .InputLike.Editable {
    background-color: transparent !important;
  }

  html[data-zb-theme] .PinDetail .FollowButton.Button--grey {
    -webkit-text-fill-color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme]
    .PinDetail
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .PinDetail
    .FollowButton.Button--grey:is(:hover, :focus-visible)
    :where(span, svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .PinDetail
    .PinItem
    a[href*="/ring/host/"] {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid transparent !important;
    border-radius: 999px !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme]
    .PinDetail
    .PinItem
    a[href*="/ring/host/"]
    :where(div, span, svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    .PinDetail
    .PinItem
    a[href*="/ring/host/"]:is(:hover, :focus-visible) {${PRIMARY_BUTTON_STYLE}
  }
`;
