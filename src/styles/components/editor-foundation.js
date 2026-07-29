import { PRIMARY_BORDER_FOCUS_STYLE } from "../shared/actions.js";
import { THIN_SCROLLBAR_STYLE } from "../shared/content.js";
import { RAISED_STRONG_CONTROL_SURFACE_STYLE } from "../shared/surfaces.js";

export const EDITOR_FOUNDATION_COMPONENT_STYLE = `  html[data-zb-theme] .Modal .Ask-form .AskTitle-input,
  html[data-zb-theme] .Modal .Ask-form .AskDetail-input {
    box-sizing: border-box !important;
    width: 100% !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme] .Modal .Ask-form .AskTitle-input {
    min-height: 46px !important;
    padding: 9px 12px !important;
  }

  html[data-zb-theme] .Modal .Ask-form .AskDetail-input {
    min-height: 104px !important;
    padding: 11px 12px !important;
  }

  html[data-zb-theme] .Modal .Ask-form .AskTitle-input:focus-within,
  html[data-zb-theme] .Modal .Ask-form .AskDetail-input:focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme] .Modal .Ask-form .AskTitle-input textarea,
  html[data-zb-theme] .Modal .Ask-form .AskDetail-input .Editable-content,
  html[data-zb-theme] .Modal .Ask-form .AskDetail-input .DraftEditor-root,
  html[data-zb-theme]
    .Modal
    .Ask-form
    .AskDetail-input
    .DraftEditor-editorContainer,
  html[data-zb-theme]
    .Modal
    .Ask-form
    .AskDetail-input
    .public-DraftEditor-content,
  html[data-zb-theme]
    .Modal
    .Ask-form
    .AskDetail-input
    .public-DraftEditorPlaceholder-root,
  html[data-zb-theme]
    .Modal
    .Ask-form
    .AskDetail-input
    .public-DraftEditorPlaceholder-inner {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .Modal .Ask-form .AskTitle-input textarea {
    width: 100% !important;
  }

  html[data-zb-theme] .Modal .Ask-form .AskDetail-input .Editable-content {
    min-height: 80px !important;
  }

  html[data-zb-theme]
    .Modal
    .Ask-form
    .public-DraftEditorPlaceholder-inner {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .Modal .Ask-form .Editable-toolbar {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .Modal .Ask-form .Editable-toolbar-controls {
    background-color: transparent !important;
  }

  html[data-zb-theme] .Modal .Ask-form .Editable-toolbar .Editable-control {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Modal .Ask-form .Editable-toolbar .Editable-control:hover,
  html[data-zb-theme]
    .Modal
    .Ask-form
    .Editable-toolbar
    .Editable-control.is-active,
  html[data-zb-theme]
    .Modal
    .Ask-form
    .Editable-toolbar
    .Editable-control[aria-pressed="true"] {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Modal .Ask-form .Editable-toolbar-separator {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .WriteArea :where(section, div, span) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .WriteArea > div > section {
    flex: 1 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
  }

  html[data-zb-theme] .WriteArea > div > section > div,
  html[data-zb-theme] .WriteArea .WritePinV2-Form,
  html[data-zb-theme] .WriteArea .WritePinToolbar,
  html[data-zb-theme] .WriteArea .TitleArea,
  html[data-zb-theme] .WriteArea .EditorArea,
  html[data-zb-theme] .WriteArea .InputLike.Editable {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }

  html[data-zb-theme] .WriteArea textarea,
  html[data-zb-theme] .WriteArea .TitleArea,
  html[data-zb-theme] .WriteArea .InputLike.Editable,
  html[data-zb-theme] .WriteArea .DraftEditor-root,
  html[data-zb-theme] .WriteArea .DraftEditor-editorContainer,
  html[data-zb-theme] .WriteArea .public-DraftEditor-content,
  html[data-zb-theme] .WriteArea .public-DraftEditorPlaceholder-root,
  html[data-zb-theme] .WriteArea .public-DraftEditorPlaceholder-inner {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .WriteArea .InputLike.Editable:focus-within {
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea,
  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .EditorArea .InputLike.Editable {
    box-sizing: border-box !important;
    width: 100% !important;
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
    border-radius: 8px !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea {
    min-height: 46px !important;
    padding: 9px 12px 7px !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .AppHeader-profileAvatar {
    align-self: flex-start !important;
    margin-top: 11px !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .EditorArea {
    margin-top: 10px !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .EditorArea .InputLike.Editable {
    min-height: 84px !important;
    padding: 10px 12px !important;${THIN_SCROLLBAR_STYLE}
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar {
    width: 8px !important;
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar-track {
    background-color: transparent !important;
    margin-block: 8px !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar-thumb {
    background-color: var(--zb-text-subtle) !important;
    background-clip: content-box !important;
    border: 2px solid transparent !important;
    border-radius: 999px !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar-thumb:hover {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable::-webkit-scrollbar-corner {
    background-color: transparent !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea:focus-within,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable:focus-within {${PRIMARY_BORDER_FOCUS_STYLE}
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea textarea,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .Editable-content,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .DraftEditor-root,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .DraftEditor-editorContainer,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .public-DraftEditor-content,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .public-DraftEditorPlaceholder-root,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .public-DraftEditorPlaceholder-inner {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .Editable-content {
    min-height: 62px !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea > div:last-child,
  html[data-zb-theme]
    .WriteArea:has(.WritePinV2-Form)
    .EditorArea
    .InputLike.Editable
    .public-DraftEditorPlaceholder-inner {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .WriteArea:has(.WritePinV2-Form) .TitleArea > div:last-child {
    top: 50% !important;
    right: 12px !important;
    height: 20px !important;
    line-height: 20px !important;
    transform: translateY(-50%) !important;
  }
`;
