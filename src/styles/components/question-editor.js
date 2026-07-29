import {
  PRIMARY_BORDER_FOCUS_STYLE,
  PRIMARY_BUTTON_STYLE,
  SOFT_PRIMARY_STATE_STYLE,
} from "../shared/actions.js";
import {
  RAISED_CONTROL_SURFACE_STYLE,
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  SECTION_HEADER_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  SURFACE_TEXT_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../shared/surfaces.js";

export const QUESTION_EDITOR_COMPONENT_STYLE = `  html[data-zb-theme] .QuestionPage .AnswerFormPortalContainer,
  html[data-zb-theme] .QuestionPage .QuestionAnswers-statusWrapper,
  html[data-zb-theme] .QuestionPage .AnswerAdd,
  html[data-zb-theme] .QuestionPage .AnswerForm,
  html[data-zb-theme] .QuestionPage .AnswerFormEditorContainer,
  html[data-zb-theme] .QuestionPage .AnswerForm-editor {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .QuestionPage .AnswerFormEditorContainer {
    background-color: var(--zb-page) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    > div:first-child
    > div:first-child {
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    > div:first-child
    > div:first-child
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title {
    color: var(--zb-text-subtle) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title
    > div {
    background-color: transparent !important;
    color: inherit !important;
    border-radius: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title:is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title::before {
    background-color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer
    .Catalog
    .Catalog-Title:is(:hover, :focus-within)::before {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer:has(.Catalog)
    .toolbarV3
    .ToolbarButton:has(.ZDI--Catalog24) {
    ${SOFT_PRIMARY_STATE_STYLE}
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormPortalContainer:has(.Catalog)
    .toolbarV3
    .ToolbarButton:has(.ZDI--Catalog24)
    :where(div, span, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .QuestionAnswers-answerAdd
    > .AnswerAdd
    > div:first-child {
    ${SECTION_HEADER_STYLE}
  }

  html[data-zb-theme]
    .QuestionPage
    .QuestionAnswers-answerAdd
    > .AnswerAdd
    > div:first-child
    :where(div, span, button, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .QuestionAnswers-answerAdd
    > .AnswerAdd
    > div:nth-child(2) {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme] .QuestionPage .toolbarV3,
  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerFormPortalContainer, .AnswerForm)
    :is(.Sticky, .Editable-toolbar) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .ToolbarButton,
  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerFormPortalContainer, .AnswerForm)
    :is(.Editable-control, .Button:not(.Button--blue)) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .ToolbarButton:hover,
  html[data-zb-theme] .QuestionPage .ToolbarButton:focus-visible,
  html[data-zb-theme] .QuestionPage .ToolbarButton.is-active,
  html[data-zb-theme] .QuestionPage .ToolbarButton[aria-pressed="true"],
  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerFormPortalContainer, .AnswerForm)
    :is(.Editable-control, .Button:not(.Button--blue)):hover {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .QuestionPage .ToolbarDivider {
    background-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .ToolbarV3Menu-container
    .Button
    > span:last-child {
    padding: 2px 6px !important;
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerForm-editor.InputLike.Editable,
  html[data-zb-theme] .QuestionPage .AnswerForm-editor {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerForm-editor
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {${TRANSPARENT_TEXT_STYLE}
    caret-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerForm-editor
    :is(.public-DraftEditorPlaceholder-root, .public-DraftEditorPlaceholder-inner) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormEditorContainer
    > div:has([role="combobox"]) {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .QuestionPage .AIAssistantPanelV2-container,
  html[data-zb-theme] .QuestionPage .AIAssistantPanelV2-container > div {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:last-child
    > div
    > div:first-child
    :where(div, span, svg) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:last-child
    > div
    > :last-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:first-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:first-child
    :where(div, span, button, svg) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:first-child {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-primary) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2) {
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    :where(div, span, svg, button) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:first-child
    button {
    background-color: var(--zb-surface-hover) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:first-child
    button:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(2) {
    padding: 8px 10px !important;
    background-color: var(--zb-surface) !important;
    border-left: 3px solid var(--zb-primary) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(3)
    > div {
    background-color: var(--zb-surface-hover) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 8px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(3)
    > div:is(:hover, :focus-within) {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(3)
    img {
    border-radius: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:has(
      :is(
        .CircleLoadingBar,
        img[src*="editor_ai_image"],
        .ZDI--ExclamationCircle24
      )
    )
    > div:nth-child(2)
    > div:first-child
    > div:nth-child(4)
    > div {
    padding: 2px 6px !important;
    ${SOFT_PRIMARY_STATE_STYLE}
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    .CircleLoadingBar
    .path {
    stroke: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:nth-child(2) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:last-child
    > div {
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    > div
    > div:first-child
    > div:last-child
    > div:is(:hover, :focus-within) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(> div > textarea[placeholder="请描述你想要配图的内容"])
    > div:first-child {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-primary) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(> textarea[placeholder="请描述你想要配图的内容"]) {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    color: var(--zb-text) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(
      > textarea[placeholder="请描述你想要配图的内容"]
    ):focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    textarea[placeholder="请描述你想要配图的内容"] {${TRANSPARENT_TEXT_STYLE}
    caret-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    textarea[placeholder="请描述你想要配图的内容"]::placeholder {
    color: var(--zb-text-subtle) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    [role="button"][aria-label^="选择"] {
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid transparent !important;
    color: var(--zb-primary) !important;
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    [role="button"][aria-label^="选择"]:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(> textarea[placeholder="请描述你想要配图的内容"])
    > div:last-child
    > div:last-child
    > div {${PRIMARY_BUTTON_STYLE}
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(> textarea[placeholder="请描述你想要配图的内容"])
    > div:last-child
    > div:last-child
    > div
    > div {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Popover-content:has(.Menu-item > div > div:first-child:empty)
    .Menu-item
    > div
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Popover-content:has(.Menu-item > div > div:first-child:empty)
    .Menu-item:is(:hover, :focus-visible)
    > div
    > div:last-child {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory,
  html[data-zb-theme] .DraftHistoryModal .DraftHistory-side,
  html[data-zb-theme] .DraftHistoryModal .DraftHistory-main {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory-side {
    border-right: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory-title,
  html[data-zb-theme] .DraftHistoryModal .DraftHistory-versionDate {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .DraftHistory-history
    > div:not(:empty):is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .DraftHistory-history
    .DraftHistory-versionDate[style*="rgb(23, 114, 246)"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory-draft {
    background-color: var(--zb-page) !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .PreviewEditableInstance.InputLike.Editable {
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .PreviewEditableInstance
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme] .DraftHistoryModal .DraftHistory-actions {
    background-color: var(--zb-surface) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .EditorHelpDoc {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .QuestionPage .EditorHelpDoc > div {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .EditorHelpDoc
    :where(div, h1, h2, h3, p, span) {
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .EditorHelpDoc
    :where(h1, h2, h3, p, div, span, svg) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .EditorHelpDoc button {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .EditorHelpDoc
    button:is(:hover, :focus, :focus-visible) {
    ${SOFT_PRIMARY_STATE_STYLE}
  }

  html[data-zb-theme]
    .QuestionPage
    .EditorHelpDoc
    div:has(> svg.ZDI)
    > div:nth-child(n + 3) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 4px !important;
  }
`;
