import {
  CURRENT_COLOR_ICON_STYLE,
  PRIMARY_FOCUS_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  SOFT_PRIMARY_STATE_STYLE,
  SURFACE_TEXT_STYLE,
  TEXT_PAINT_STYLE,
  THIN_SCROLLBAR_STYLE,
} from "../shared-components.js";

export const HOME_SIDEBAR_COMPONENT_STYLE = `  html[data-zb-theme] .Topstory-container > .Topstory-mainColumn + *,
  html[data-zb-theme] [data-zb-home-sidebar] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] [data-zb-home-sidebar] :where(div, span),
  html[data-zb-theme]
    [data-za-detail-view-path-module="RightSideBar"]
    .Card
    :where(div, span),
  html[data-zb-theme]
    [aria-label="创作中心卡片"]
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme]
    [aria-label="创作中心卡片"]
    .CreatorEntrance-creatorIcon {
    color: var(--zb-text) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .Topstory-container > .Topstory-mainColumn + * .Card > div {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    [data-za-detail-view-path-module="RightSideBar"]
    .Card,
  html[data-zb-theme]
    [data-za-detail-view-path-module="RightSideBar"]
    .Card
    > div {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:is(:focus-visible, :focus-within) {
    border-color: var(--zb-primary) !important;
    ${PRIMARY_FOCUS_STYLE}
  }

  html[data-zb-theme] .Topstory-container > .Topstory-mainColumn + * .Card,
  html[data-zb-theme] [data-zb-home-sidebar] .Card,
  html[data-zb-theme] [aria-label="创作中心卡片"] {
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border-color: var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    :is(
      .CreatorEntrance-hint,
      .ProfileSideCreator-readCountNumber,
      .HotSearchCard-title,
      .HotSearchCard-itemText,
      .KfeCollection-CreateSaltCard-content-title
    ) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    :is(
      .HotSearchCard-heat,
      .KfeCollection-CreateSaltCard-content-sub-title
  ) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    :is(.HotSearchCard-item, .HotSearchCard-itemLink) {
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    .HotSearchCard-item {
    box-sizing: border-box !important;
    margin: 4px -8px !important;
    overflow: hidden !important;
    padding: 6px 8px !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    .HotSearchCard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    .HotSearchCard-item:focus-within {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    .HotSearchCard-itemLink:focus-visible {
    outline: 0 !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    > [data-zb-follow-card-track] {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    > [data-zb-follow-card-track]
    > [data-zb-follow-card-slide] {
    box-sizing: border-box !important;
    flex: 0 0 100% !important;
    width: 100% !important;
    min-width: 100% !important;
    padding-right: 8px !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    :is(
      a[href="/creator"],
      a[href="/question/waiting"],
      a[href="/consult"],
      a[href="/education/learning"],
      .KfeCollection-CreateSaltCard-button
    ) {
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 36px !important;
    padding-inline: 12px !important;
    background-color: transparent !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-weight: 500 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    :is(
      a[href="/creator"],
      a[href="/question/waiting"],
      a[href="/consult"],
      a[href="/education/learning"],
      .KfeCollection-CreateSaltCard-button
    )
    svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    [data-zb-author-follow-row] {
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    [data-zb-author-follow-row]
    > .AuthorInfo {
    flex: 1 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    .AuthorInfo-content {
    width: auto !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    :is(.AuthorInfo-head, .AuthorInfo-detail) {
    max-width: 100% !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    .FollowButton {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 auto !important;
    min-width: 64px !important;
    min-height: 34px !important;
    margin-left: 8px !important;
    padding-inline: 12px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    .FollowButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    [data-zb-follow-card]
    .FollowButton
    svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme] .HotSearchCard-tagHot {
    background-color: var(--zb-danger-soft) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme] .HotSearchCard-tagActivity {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme] .HotSearchCard-dot {
    background-color: var(--zb-warning) !important;
  }

  html[data-zb-theme]
    [role="dialog"]:is(
      :has(.OrgCreateButton),
      :has(a[href^="/term/"]),
      :has(a[href*="/certificates"]),
      :has(a[href="/question/19581624"])
    ) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme]
    div:has(> [role="dialog"][id^="react-aria-"]) {
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    border-radius: 10px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    div:has(> [role="dialog"][id^="react-aria-"])
    > svg {
    color: var(--zb-surface) !important;
    fill: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > svg {
    color: var(--zb-surface-raised) !important;
    fill: var(--zb-surface-raised) !important;
    filter: drop-shadow(0 1px 0 var(--zb-border-strong)) !important;
    left: 50% !important;
    margin-top: 4px !important;
    stroke: none !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > div {
    background-color: transparent !important;
    padding-block: 4px !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > svg
    + div {
    ${TEXT_PAINT_STYLE}
    opacity: 1 !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > div
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    box-sizing: border-box !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
    margin-inline: 4px !important;
    min-height: 36px !important;
    padding-inline: 10px !important;
    width: calc(100% - 8px) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[width="26"][height="10"] + div)
    > div
    > div:is(:hover, :focus, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    [role="dialog"]:is(
      :has(.OrgCreateButton),
      :has(a[href^="/term/"]),
      :has(a[href*="/certificates"]),
      :has(a[href="/question/19581624"])
    )
    > :where(a, div) {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    [role="dialog"]:is(
      :has(.OrgCreateButton),
      :has(a[href^="/term/"]),
      :has(a[href*="/certificates"]),
      :has(a[href="/question/19581624"])
    )
    > :where(a, div):hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme]
    [role="dialog"]:has(.OrgCreateButton)
    .OrgCreateButton {
    width: 100% !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    color: inherit !important;
  }

  html[data-zb-theme]
    [role="dialog"]:has(.OrgCreateButton)
    .OrgCreateButton:hover {
    background-color: transparent !important;
    color: inherit !important;
  }

  html[data-zb-theme]
    [role="dialog"]:has(a[href*="/certificates"])
    > div:last-child {
    color: var(--zb-text-subtle) !important;
  }
`;
