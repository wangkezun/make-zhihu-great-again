export const COLUMN_PAGE_STYLE = `  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    > div:last-child {
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px 12px 0 0 !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-column-page="true"][data-zb-column-tabs-stuck="true"]
    .App-main
    > div
    > .Card
    + div {
    background-color: var(--zb-page) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"][data-zb-column-tabs-stuck="true"]
    .App-main
    > div
    > .Card
    + div
    > div:last-child {
    border-radius: 12px !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    > div:first-child {
    background-color: var(--zb-page) !important;
    border: 0 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div {
    box-sizing: border-box !important;
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
    margin-top: -2px !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child,
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > section
    > div
    > div:has(.ContentItem) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    margin-bottom: 10px !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child {
    height: auto !important;
    padding-bottom: 20px !important;
    border-top: 0 !important;
    border-radius: 0 0 12px 12px !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    > section {
    box-sizing: border-box !important;
    margin-top: 16px !important;
    padding: 16px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    > section
    > h4 {
    margin: 0 !important;
    color: var(--zb-text) !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    line-height: 22px !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    > section
    > div:first-of-type {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 16px !important;
    margin: 12px 0 0 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    > section
    > div:first-of-type
    > div:first-child {
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    > section
    > div:last-of-type {
    display: flex !important;
    align-items: baseline !important;
    gap: 12px !important;
    height: auto !important;
    margin-top: 14px !important;
    padding-top: 12px !important;
    border-top: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    > section
    > div:last-of-type
    > div:first-child {
    flex: 0 0 auto !important;
    color: var(--zb-text-subtle) !important;
    -webkit-text-fill-color: var(--zb-text-subtle) !important;
    font-size: 13px !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    > section
    > div:last-of-type
    > div:last-child {
    min-width: 0 !important;
    color: var(--zb-text-secondary) !important;
    -webkit-text-fill-color: var(--zb-text-secondary) !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > section
    > div
    > div:has(.ContentItem):hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > section
    > div
    > div {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    > div:last-child
    :where(div, span),
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    :where(a, div, span) {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    > div:last-child
    > div:first-child
    :where(div, span),
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    .UserLink-link {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    .FollowButton.Button--blue {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 64px !important;
    min-height: 34px !important;
    padding-inline: 12px !important;
    background-color: var(--zb-primary) !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--ctp-crust) !important;
    -webkit-text-fill-color: var(--ctp-crust) !important;
    font-weight: 500 !important;
    flex: 0 0 auto !important;
    margin-left: auto !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    .FollowButton.Button--blue
    :where(span, svg, path) {
    color: var(--ctp-crust) !important;
    fill: currentColor !important;
    -webkit-text-fill-color: var(--ctp-crust) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    .FollowButton.Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--ctp-crust) !important;
    -webkit-text-fill-color: var(--ctp-crust) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    .FollowButton.Button--blue:hover
    :where(span, svg, path) {
    color: var(--ctp-crust) !important;
    fill: currentColor !important;
    -webkit-text-fill-color: var(--ctp-crust) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    + div
    + div
    > div:first-child
    .FollowButton.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    > div
    > div:nth-child(2),
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    > div
    > div:nth-child(2)
    :where(div, span),
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .AuthorInfo
    + div,
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .AuthorInfo
    + div
    :where(div, span) {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton,
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton
    + .Button.Button--blue {
    box-sizing: border-box !important;
    min-width: 96px !important;
    min-height: 34px !important;
    padding-inline: 14px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton.Button--blue,
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton
    + .Button.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
    -webkit-text-fill-color: var(--ctp-crust) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton.Button--blue:hover,
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton
    + .Button.Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton.Button--grey:hover {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton:focus-visible,
  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton
    + .Button.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .FollowButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .Button--plain:has(.Zi--Dots) {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 34px !important;
    min-width: 34px !important;
    height: 34px !important;
    padding: 5px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .Button--plain:has(.Zi--Dots):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .Button--plain:has(.Zi--Dots):focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .App-main
    > div
    > .Card
    .Button--plain:has(.Zi--Dots)
    :where(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button:not(.VoteButton) {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .VoteButton {
    box-sizing: border-box !important;
    height: 32px !important;
    padding-inline: 12px !important;
    border-radius: 3px !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button:not(.VoteButton):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button:not(.VoteButton):focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button[aria-label="收藏"]:is(:hover, :focus-visible)
    .Zi--Star,
  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button[aria-label="已收藏"]
    .Zi--Star {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button:is(
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    )
    :has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24))
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-column-page="true"] .ContentItem-more {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-size: 14px !important;
    line-height: 22px !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-more:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-more:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-column-page="true"] .Column-EmptyCard {
    box-sizing: border-box !important;
    margin-top: 12px !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text-muted) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-column-page="true"] .Column-EmptyCard p {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .Column-EmptyCard
    svg
    path:first-of-type {
    fill: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme][data-zb-column-page="true"]
    .Column-EmptyCard
    svg
    path:last-of-type {
    fill: var(--zb-surface-raised) !important;
  }

`;
