import { SKELETON_SHIMMER_STYLE } from "../shared/feedback.js";
import { CARD_FRAME_STYLE } from "../shared/surfaces.js";

export const LOADING_FEEDBACK_COMPONENT_STYLE = `  html[data-zb-theme] blockquote {
    border-color: var(--ctp-lavender) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] pre,
  html[data-zb-theme] code,
  html[data-zb-theme] .highlight {
    background-color: var(--ctp-crust) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] hr {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .LoadingBar {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    div:has(
      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]
    ) {
    ${CARD_FRAME_STYLE}
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    div:has(
      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]
    )
    .BounceLoading-child {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Skeleton,
  html[data-zb-theme] [class*="Skeleton"],
  html[data-zb-theme] .PlaceHolder,
  html[data-zb-theme] .PlaceHolder-inner {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .PlaceHolder-bg {${SKELETON_SHIMMER_STYLE}
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder,
  html[data-zb-theme] .QuestionPage .PlaceHolder-inner {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder {
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.LinkCard-title.loading, .LinkCard-desc.loading) {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 4px !important;
  }

  html[data-zb-theme] .skeleton {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .skeleton__line {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 25%,
      var(--zb-surface-hover) 75%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme] .skeleton__line::after {
    background-color: color-mix(
      in srgb,
      var(--zb-surface-hover) 80%,
      transparent
    ) !important;
    box-shadow: 0 0 20px 20px
      color-mix(in srgb, var(--zb-surface-hover) 70%, transparent) !important;
  }

  html[data-zb-theme] .Topstory-mainColumnCard:empty {
    background-color: var(--zb-page) !important;
    box-shadow: none !important;
  }
`;
