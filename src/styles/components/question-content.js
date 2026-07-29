import { OUTLINED_PRIMARY_BUTTON_STYLE, SOFT_PRIMARY_STATE_STYLE } from "../shared/actions.js";
import {
  CURRENT_COLOR_ICON_STYLE,
  PRIMARY_TEXT_PAINT_STYLE,
  TEXT_PAINT_STYLE,
} from "../shared/content.js";
import {
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../shared/surfaces.js";

export const QUESTION_CONTENT_COMPONENT_STYLE = `  html[data-zb-theme] .QuestionHeader-footer .Button:not(.Button--blue),
  html[data-zb-theme] .QuestionHeaderActions .Button:not(.Button--blue) {
    background-color: transparent !important;
    border-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .Button:not(.Button--blue):hover,
  html[data-zb-theme] .QuestionHeaderActions .Button:not(.Button--blue):hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme]
    .QuestionHeader
    :is(.FollowButton, .WriteAnswerButton),
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton) {
    min-height: 34px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme] .QuestionHeader .WriteAnswerButton,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .WriteAnswerButton {${OUTLINED_PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme]
    .QuestionHeader
    :is(.FollowButton, .WriteAnswerButton)
    svg,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton)
    svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme] .QuestionHeader-footer-main {
    column-gap: 12px !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionButtonGroup {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionButtonGroup .Button {
    min-height: 34px !important;
    margin: 0 !important;
    font-size: 14px !important;
    line-height: 32px !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionHeaderActions {
    align-items: center !important;
    gap: 4px !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .QuestionHeaderActions > * {
    margin: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeaderActions
    .Button,
  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeader-actions
    > .Button {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 34px !important;
    margin: 0 !important;
    padding: 0 10px !important;
    border: 1px solid transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 32px !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeader-actions
    > .Button
    svg,
  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeaderActions
    .Button
    svg {
    width: 16px !important;
    height: 16px !important;
    ${CURRENT_COLOR_ICON_STYLE}
    flex: 0 0 16px !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeader-actions
    > .Button
    svg {
    margin-left: 4px !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeaderActions
    .Button--iconOnly {
    width: 34px !important;
    padding: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeaderActions
    .Button
    svg {
    margin-right: 6px !important;
  }

  html[data-zb-theme]
    .QuestionHeader-footer
    .QuestionHeaderActions
    .Button--iconOnly
    svg {
    margin-right: 0 !important;
  }

  html[data-zb-theme] .PageHeader .QuestionHeader-title {
    font-size: 22px !important;
    font-weight: 600 !important;
    line-height: 32px !important;
  }

  html[data-zb-theme][data-zb-question-content-under-header="true"]
    .AppHeader {
    box-shadow:
      0 10px 0 var(--zb-page),
      var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton)
    svg {
    ${CURRENT_COLOR_ICON_STYLE}
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-title,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item > a,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemText,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemText a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard {
    overflow: hidden !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-heat {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemLink {
    border-radius: 10px !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item {
    box-sizing: border-box !important;
    margin: 6px -8px !important;
    padding: 6px 8px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemLink {
    min-width: 0 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-itemLink:focus-visible {
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:focus-within {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:hover
    .HotSearchCard-itemText,
  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:hover
    .HotSearchCard-itemText
    :where(a, span),
  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:focus-within
    .HotSearchCard-itemText,
  html[data-zb-theme]
    .Question-sideColumn
    .HotSearchCard-item:focus-within
    .HotSearchCard-itemText
    :where(a, span) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(
      .RelatedQuestions-item,
      .RelatedQuestions-listItem,
      .SimilarQuestions-item
    ) {
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    margin: 4px -8px !important;
    padding: 6px 8px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 10px !important;
    color: var(--zb-text-muted) !important;
    font-size: 13px !important;
    line-height: 21px !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    transition: background-color 0.16s ease !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(
      .RelatedQuestions-item,
      .RelatedQuestions-listItem,
      .SimilarQuestions-item
    )
    > a[href^="/question/"] {
    display: block !important;
    flex: 1 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    color: var(--zb-text) !important;
    font-size: 14px !important;
    line-height: 21px !important;
    overflow: hidden !important;
    padding: 0 !important;
    text-align: left !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(.RelatedQuestions, .SimilarQuestions-list)
    a[href^="/question/"] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    [data-za-detail-view-path-module="RelatedQuestions"]
    :is(
      .RelatedQuestions-item,
      .RelatedQuestions-listItem,
      .SimilarQuestions-item
    ) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(
      .RelatedQuestions-item,
      .RelatedQuestions-listItem,
      .SimilarQuestions-item
    ):is(:hover, :focus-within),
  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(
      .RelatedQuestions-item,
      .RelatedQuestions-listItem,
      .SimilarQuestions-item
    ):is(:hover, :focus-within)
    > a[href^="/question/"],
  html[data-zb-theme]
    .Question-sideColumn
    :is(.RelatedQuestions, .SimilarQuestions-list)
    a[href^="/question/"]:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(
      .RelatedQuestions-item,
      .RelatedQuestions-listItem,
      .SimilarQuestions-item
    )
    > a[href^="/question/"]:focus-visible {
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(.AnswerAuthor, .NumberBoard)
    .NumberBoard-item {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-itemName {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-itemValue {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-item {
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor
    .NumberBoard-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    :is(.AnswerAuthor, .NumberBoard)
    .NumberBoard-item:hover
    .NumberBoard-itemValue {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] [data-zb-hover-card] {
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    padding-right: 16px !important;
    padding-left: 16px !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] [data-zb-hover-card] .Avatar {
    top: -8px !important;
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    [data-zb-hover-card-avatar-row] {
    padding-bottom: 21px !important;
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme] [data-zb-hover-card] .HoverCard-description {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] [data-zb-hover-card] .UserLink-link {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    .UserLink-link:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    .NumberBoard-itemName {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    .NumberBoard-itemValue {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] [data-zb-hover-card] .HoverCard-buttons {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    .HoverCard-buttons
    .Button {
    box-sizing: border-box !important;
    min-width: 0 !important;
    width: auto !important;
    margin: 0 !important;
    border-radius: 6px !important;
    flex: 1 1 0 !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme] [data-zb-hover-card] .NumberBoard-item {
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    .NumberBoard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    .NumberBoard-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    .HoverCard-buttons
    .Button:not(.FollowButton) {${OUTLINED_PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    [data-zb-hover-card-single-action]
    > .Button.Button--grey {
    position: relative !important;
    height: 34px !important;
    min-height: 34px !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    [data-zb-hover-card-single-action]
    > .Button.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
  }

  html[data-zb-theme]
    [data-zb-hover-card]
    [data-zb-hover-card-single-action]
    > .Button.Button--grey:is(:hover, :focus-visible)::after {
    content: "取消关注" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: var(--zb-danger) !important;
    font-size: 14px !important;
    line-height: normal !important;
  }

  html[data-zb-theme] .AnswerList .List-headerOptions .Button,
  html[data-zb-theme] .AnswerList .Select-button {
    background-color: transparent !important;
    border-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .AnswerList .List-headerOptions .Button:hover,
  html[data-zb-theme] .AnswerList .Select-button:hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 34px !important;
    padding-inline: 12px !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 32px !important;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      color 160ms ease !important;
  }

  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button:hover,
  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button:focus-visible,
  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button[aria-expanded="true"] {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button
    svg {
    width: 14px !important;
    height: 14px !important;
    margin-left: 6px !important;
    ${CURRENT_COLOR_ICON_STYLE}
    flex: 0 0 14px !important;
  }

  html[data-zb-theme] .Select-option {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme] .Select-option:hover,
  html[data-zb-theme] .Select-option.is-selected,
  html[data-zb-theme] .Select-option[aria-selected="true"] {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Question-sideColumn {
    min-width: 0 !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    :is(.AnswerCard, .ViewAll, .MoreAnswers) {
    background-clip: padding-box !important;
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .ViewAll
    :is(a, .Button) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .ViewAll
    :is(a, .Button):is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionRichText-more.Button,
  html[data-zb-theme]
    body
    .QuestionPage
    .AnswerItem
    .ContentItem-expandButton.Button {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    ${PRIMARY_TEXT_PAINT_STYLE}
    font-size: 14px !important;
    line-height: 22px !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionRichText-more.Button {
    display: inline-flex !important;
    align-items: center !important;
  }

  html[data-zb-theme]
    body
    .QuestionPage
    .AnswerItem
    .ContentItem-expandButton.Button {
    display: block !important;
    width: max-content !important;
    margin: 8px auto 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionRichText-more.Button:is(:hover, :focus-visible),
  html[data-zb-theme]
    body
    .QuestionPage
    .AnswerItem
    .ContentItem-expandButton.Button:is(:hover, :focus-visible) {
    ${SOFT_PRIMARY_STATE_STYLE}
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionRichText--collapsed:is(:hover, :focus-within) {
    ${TEXT_PAINT_STYLE}
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionRichText-more.Button
    svg {
    width: 16px !important;
    height: 16px !important;
    margin-left: 4px !important;
    ${CURRENT_COLOR_ICON_STYLE}
    flex: 0 0 16px !important;
  }

  html[data-zb-theme] .QuestionPage .VoteButton {
    border-radius: 6px !important;
  }

  html[data-zb-theme] .Question-mainColumn .AnswersNavWrapper,
  html[data-zb-theme] .Question-mainColumn .AnswersNavWrapper > .List {
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .AnswersNavWrapper
    .List-header {
    box-sizing: border-box !important;
    width: 100% !important;
    min-height: 50px !important;
    margin: 0 0 10px !important;
    padding: 0 20px !important;
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .AnswersNavWrapper
    .List-item {
    box-sizing: border-box !important;
    margin-bottom: 10px !important;
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .AnswersNavWrapper
    .List-item::after {
    display: none !important;
  }

  html[data-zb-theme] .Question-mainColumn .MoreAnswers .List-header {
    margin-bottom: 8px !important;
  }

  html[data-zb-theme] .Question-mainColumn .MoreAnswers .List-headerText {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .MoreAnswers
    :is(.List-header, .List-item)::after,
  html[data-zb-theme] .Question-sideColumn .AnswerAuthor .Card-section::after {
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton {
    min-height: 34px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor-buttons
    .Button:not(.FollowButton) {
    min-height: 34px !important;
    background-color: transparent !important;
    border-color: var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    > div[style*="position: sticky"][style*="overflow: auto"] {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    > div[style*="position: sticky"][style*="overflow: auto"]::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  html[data-zb-theme] .Question-sideColumn :is(.Footer, footer) {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
    color: var(--zb-text-muted) !important;
    overflow-x: hidden !important;
    overflow-wrap: anywhere !important;
  }

  html[data-zb-theme] .Question-sideColumn .Footer a,
  html[data-zb-theme] .Question-sideColumn .Footer-item,
  html[data-zb-theme] .Question-sideColumn .Footer-copyright,
  html[data-zb-theme] .Question-sideColumn .Footer-certificate,
  html[data-zb-theme] .Question-sideColumn .Footer-zhihuIntegrity {
    max-width: 100% !important;
    color: var(--zb-text-muted) !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
  }

  html[data-zb-theme] .Question-sideColumn .Footer a:hover,
  html[data-zb-theme] .Question-sideColumn .Footer a:focus-visible,
  html[data-zb-theme]
    .Question-sideColumn
    .Footer
    a:is(:hover, :focus-visible)
    :where(span, svg),
  html[data-zb-theme]
    .Question-sideColumn
    footer
    a:is(:hover, :focus-visible)
    :where(span, svg) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    footer
    :where(a, button, div, span, p, svg) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Question-sideColumn footer :where(a, button):hover {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    footer
    :where(a, button):is(:hover, :focus-visible),
  html[data-zb-theme]
    .Question-sideColumn
    footer
    :where(a, button):is(:hover, :focus-visible)
    :where(span, div, svg) {
    color: var(--zb-primary) !important;
  }
`;
