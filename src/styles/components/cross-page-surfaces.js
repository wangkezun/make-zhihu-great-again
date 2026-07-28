export const CROSS_PAGE_SURFACES_STYLE = `
  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-recommend
    > .TopstoryItem,
  html[data-zb-theme] .TopstoryItem.TopstoryItem-isFollow {
    box-sizing: border-box !important;
    margin-bottom: 10px !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-recommend
    > .TopstoryItem:hover,
  html[data-zb-theme] .TopstoryItem.TopstoryItem-isFollow:hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-recommend
    > .TopstoryItem:focus-visible,
  html[data-zb-theme] .TopstoryItem.TopstoryItem-isFollow:focus-visible,
  html[data-zb-theme] .Topstory-hot .HotItem:focus-visible {
    border-color: var(--zb-primary) !important;
    box-shadow:
      var(--zb-shadow),
      0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions {
    box-sizing: border-box !important;
    width: calc(100% + 32px) !important;
    margin-right: -16px !important;
    margin-left: -16px !important;
    padding-right: 16px !important;
    padding-left: 16px !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"] .PinItem a.LinkCard,
  html[data-zb-theme] .PinDetail .PinItem a.LinkCard {
    background: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    a.LinkCard
    .LinkCard-wrapper,
  html[data-zb-theme]
    .PinDetail
    .PinItem
    a.LinkCard
    .LinkCard-wrapper {
    background: transparent !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    a.LinkCard
    .LinkCard-title,
  html[data-zb-theme] .PinDetail .PinItem a.LinkCard .LinkCard-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    a.LinkCard
    :is(.LinkCard-excerpt, .LinkCard-desc),
  html[data-zb-theme]
    .PinDetail
    .PinItem
    a.LinkCard
    :is(.LinkCard-excerpt, .LinkCard-desc) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    a.LinkCard
    .LinkCard-image,
  html[data-zb-theme] .PinDetail .PinItem a.LinkCard .LinkCard-image {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    a.LinkCard:is(:hover, :focus-visible),
  html[data-zb-theme]
    .PinDetail
    .PinItem
    a.LinkCard:is(:hover, :focus-visible) {
    background: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    .ContentItem-actions
    .VoteButton,
  html[data-zb-theme]
    .PinDetail
    .PinItem
    .ContentItem-actions
    .VoteButton {
    box-sizing: border-box !important;
    min-height: 32px !important;
    border-color: transparent !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme] .QuestionPage .RichContent-actions.is-fixed,
  html[data-zb-theme] .HotLanding .RichContent-actions.is-fixed {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    background-clip: border-box !important;
    border: 0 !important;
    border-top: 1px solid var(--zb-border) !important;
    border-radius: 0 !important;
    box-shadow: 0 -6px 14px
      color-mix(in srgb, var(--ctp-crust) 12%, transparent) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.PlaceHolder-mask, .PlaceHolder-mask path),
  html[data-zb-theme]
    .SearchMain
    :is(.PlaceHolder-mask, .PlaceHolder-mask path),
  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedList
    :is(.PlaceHolder-mask, .PlaceHolder-mask path),
  html[data-zb-theme]
    .VoterList-content
    :is(.PlaceHolder-mask, .PlaceHolder-mask path),
  html[data-zb-theme]
    .Comments-container
    :is(.PlaceHolder-mask, .PlaceHolder-mask path),
  html[data-zb-theme]
    [data-zb-comment-modal]
    > div
    > div:nth-child(2)
    :is(.PlaceHolder-mask, .PlaceHolder-mask path) {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    .Comments-container
    :is(.InputLike, .Editable),
  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation-input,
  html[data-zb-theme]
    .QuestionPage
    .AnswerFormEditorContainer
    > div:has([role="combobox"])
    [role="combobox"],
  html[data-zb-theme] .Editable-languageSuggestionsInput,
  html[data-zb-theme] .Editable-languageSuggestionsInput input,
  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }
`;
