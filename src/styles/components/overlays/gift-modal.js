import {
  MUTED_TEXT_PAINT_STYLE,
  PRIMARY_TEXT_PAINT_STYLE,
  TEXT_PAINT_STYLE,
} from "../../shared/content.js";
import { RAISED_STRONG_CONTROL_SURFACE_STYLE } from "../../shared/surfaces.js";

export const GIFT_MODAL_OVERLAY_STYLE = `  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .Modal-content
    > div
    > div:has(+ div + div > .SendGiftModal-GiftListWrapper),
  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper) {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper)
    > button {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper)
    > button:is(:hover, :focus-visible) {
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-GiftListWrapper),
  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .SendGiftModal-GiftListWrapper
    > div
    > div:last-child {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal
    .SendGiftModal-GiftListWrapper
    > div
    > div:not(:last-child),
  html[data-zb-theme]
    .Modal
    .SendGiftModal-RedpacketListWrapper
    > div
    > div,
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:not(:last-child)
    :where(div, span) {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal
    .SendGiftModal-RedpacketListWrapper
    > div:not(:empty) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:not(:last-child) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:first-child
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:nth-child(2)
    span,
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:last-child {
    ${MUTED_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(> button):last-child
    > div:first-child {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    a[href*="/grapp/protocol/payment"] {
    ${PRIMARY_TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(> button):last-child
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:first-child
    > div:last-child {
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    )
    .Modal-closeIcon {
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    .Modal-content
    > div
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    input[placeholder="0"] {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    input[placeholder="0"]::placeholder {
    color: var(--zb-text-subtle) !important;
    -webkit-text-fill-color: var(--zb-text-subtle) !important;
  }

`;
