export const ANSWER_ACTIONS_STICKY_STYLE = `
  html[data-zb-theme] .zb-answer-actions-placeholder {
    display: none !important;
    pointer-events: none !important;
  }

  html[data-zb-theme] .zb-answer-actions-placeholder.is-active {
    display: block !important;
    height: var(--zb-answer-actions-height, 0) !important;
  }

  html[data-zb-theme]
    .ContentItem-actions:is(
      .zb-answer-actions-fixed,
      .zb-answer-actions-native-fixed
    ) {
    position: fixed !important;
    top: auto !important;
    right: auto !important;
    bottom: 0 !important;
    left: var(--zb-answer-actions-left) !important;
    width: var(--zb-answer-actions-width) !important;
    margin: 0 !important;
    box-sizing: border-box !important;
    background-color: var(--zb-surface, #fff) !important;
    border: 0 !important;
    border-top: 1px solid var(--zb-border, #ebebeb) !important;
    border-radius: 0 !important;
    color: var(--zb-text, #121212) !important;
    box-shadow: 0 -6px 14px
      color-mix(in srgb, var(--ctp-crust, #11111b) 12%, transparent) !important;
    transform: none !important;
    z-index: 20 !important;
  }

  html[data-zb-theme]
    .ContentItem-actions:is(
      .zb-answer-actions-fixed,
      .zb-answer-actions-native-fixed
    )
    > .ContentItem-action:not(.ContentItem-rightButton) {
    margin-left: 16px !important;
  }

  html[data-zb-theme]
    .ContentItem-actions:is(
      .zb-answer-actions-fixed,
      .zb-answer-actions-native-fixed
    )
    > .ContentItem-rightButton {
    flex: 0 0 auto !important;
    margin-left: auto !important;
  }

  html[data-zb-theme]
    .ContentItem-actions:is(
      .zb-answer-actions-fixed,
      .zb-answer-actions-native-fixed
    )
    .PinToolbar-actions {
    background-color: var(--zb-surface, #fff) !important;
    border-color: var(--zb-border, #ebebeb) !important;
    color: var(--zb-text, #121212) !important;
  }
`;
