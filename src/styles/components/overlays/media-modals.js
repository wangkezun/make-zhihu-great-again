import { SURFACE_TEXT_STYLE } from "../../shared/surfaces.js";

export const MEDIA_MODALS_OVERLAY_STYLE = `  html[data-zb-theme] .Modal:has(canvas[alt="二维码"]) .Modal-content div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:first-child
    > div:first-child
    > div:first-child {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:first-child
    > div:first-child
    > div:last-child,
  html[data-zb-theme]
    .Modal:has(canvas[alt="二维码"])
    .Modal-content
    > div
    > div
    > div
    > div:nth-last-child(2),
  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:first-child,
  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div)
    > svg
    + div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:has(> svg + div)
    > svg {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child,
  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child
    div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.VideoUploadButton-fileInput)
    .Modal-content
    > div:last-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-inner,
  html[data-zb-theme] .Editable-videoModal .Modal-content {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .Editable-videoModal-title,
  html[data-zb-theme] .Editable-videoModal-uploader-text {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader:hover {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader-icon {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal-uploader-tip,
  html[data-zb-theme] .Editable-videoModal .Modal-footer,
  html[data-zb-theme] .Editable-videoModal .Modal-footer p {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-footer {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-footer a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-videoModal .Modal-closeButton {
    color: var(--zb-text-muted) !important;
  }

`;
