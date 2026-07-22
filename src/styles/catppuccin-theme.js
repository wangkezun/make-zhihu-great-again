import { flavors } from "@catppuccin/palette";

const createPaletteVariables = (flavor) =>
  Object.entries(flavor.colors)
    .map(([name, color]) => `    --ctp-${name}: ${color.hex};`)
    .join("\n");

const createFlavorRule = (name) => `
  html[data-zb-theme="${name}"] {
${createPaletteVariables(flavors[name])}
    color-scheme: ${flavors[name].dark ? "dark" : "light"};
  }`;

const flavorRules = ["latte", "frappe", "macchiato", "mocha"].map(createFlavorRule).join("\n");

export const CATPPUCCIN_THEME_STYLE = `
${flavorRules}

  html[data-zb-theme="system"] {
${createPaletteVariables(flavors.latte)}
    color-scheme: light;
  }

  @media (prefers-color-scheme: dark) {
    html[data-zb-theme="system"] {
${createPaletteVariables(flavors.mocha)}
      color-scheme: dark;
    }
  }

  html[data-zb-theme] {
    --zb-page: var(--ctp-mantle);
    --zb-surface: var(--ctp-base);
    --zb-surface-raised: var(--ctp-surface0);
    --zb-surface-hover: var(--ctp-surface1);
    --zb-border: var(--ctp-surface0);
    --zb-border-strong: var(--ctp-surface1);
    --zb-text: var(--ctp-text);
    --zb-text-muted: var(--ctp-subtext0);
    --zb-text-subtle: var(--ctp-overlay0);
    --zb-primary: var(--ctp-blue);
    --zb-primary-hover: var(--ctp-sapphire);
    --zb-primary-soft: color-mix(in srgb, var(--ctp-blue) 16%, transparent);
    --zb-danger: var(--ctp-red);
    --zb-danger-soft: color-mix(in srgb, var(--ctp-red) 14%, transparent);
    --zb-success: var(--ctp-green);
    --zb-warning: var(--ctp-peach);
    --zb-shadow: 0 1px 3px color-mix(in srgb, var(--ctp-crust) 28%, transparent);
    background: var(--zb-page) !important;
    scrollbar-color: var(--ctp-overlay0) var(--zb-page);
  }

  html[data-zb-theme] body,
  html[data-zb-theme] #root,
  html[data-zb-theme] .App-main,
  html[data-zb-theme] .Topstory-body {
    background-color: var(--zb-page) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] ::selection {
    background: var(--ctp-lavender) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] :focus-visible {
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .AppHeader,
  html[data-zb-theme] .AppHeader-inner,
  html[data-zb-theme] .Sticky.is-fixed {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
    border-color: var(--zb-border) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .AppHeader a,
  html[data-zb-theme] .AppHeader button,
  html[data-zb-theme] .AppHeader svg,
  html[data-zb-theme] .AppHeader-Tabs a {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .AppHeader a:hover,
  html[data-zb-theme] .AppHeader button:hover,
  html[data-zb-theme] .AppHeader-Tab--active a,
  html[data-zb-theme] .AppHeader-Tabs a[aria-current="page"] {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .SearchBar-input,
  html[data-zb-theme] .Input-wrapper,
  html[data-zb-theme] input,
  html[data-zb-theme] textarea,
  html[data-zb-theme] select,
  html[data-zb-theme] [contenteditable="true"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    caret-color: var(--zb-primary) !important;
  }

  html[data-zb-theme] input::placeholder,
  html[data-zb-theme] textarea::placeholder,
  html[data-zb-theme] [contenteditable="true"]:empty::before {
    color: var(--zb-text-subtle) !important;
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

  html[data-zb-theme] .Card,
  html[data-zb-theme] .TopstoryItem,
  html[data-zb-theme] .Topstory-mainColumnCard,
  html[data-zb-theme] .Topstory-mainColumnCard > div,
  html[data-zb-theme] .WriteArea,
  html[data-zb-theme] .HotSearchCard,
  html[data-zb-theme] .CreatorEntrance,
  html[data-zb-theme] .KfeCollection-CreateSaltCard,
  html[data-zb-theme] .Modal-inner,
  html[data-zb-theme] .Popover-content,
  html[data-zb-theme] .Menu,
  html[data-zb-theme] .Dropdown-menu,
  html[data-zb-theme] .Select-list,
  html[data-zb-theme] .AutoComplete-menu {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .TopstoryItem,
  html[data-zb-theme] .ContentItem,
  html[data-zb-theme] .List-item,
  html[data-zb-theme] .Menu-item,
  html[data-zb-theme] .Menu-divider {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme] h1,
  html[data-zb-theme] h2,
  html[data-zb-theme] h3,
  html[data-zb-theme] h4,
  html[data-zb-theme] h5,
  html[data-zb-theme] h6,
  html[data-zb-theme] .ContentItem-title,
  html[data-zb-theme] .AuthorInfo-name,
  html[data-zb-theme] .RichContent,
  html[data-zb-theme] .RichText {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .ContentItem-meta,
  html[data-zb-theme] .ContentItem-time,
  html[data-zb-theme] .AuthorInfo-badgeText,
  html[data-zb-theme] .RichContent-actions,
  html[data-zb-theme] .Button:not(.Button--blue):not(.VoteButton) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] a:hover,
  html[data-zb-theme] .ContentItem-title a:hover,
  html[data-zb-theme] .RichText a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Button:not(.Button--blue):not(.VoteButton):hover,
  html[data-zb-theme] .Menu-item:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-languageSuggestions,
  html[data-zb-theme] .Editable-languageSuggestions .Popover-content,
  html[data-zb-theme] .Editable-languageSuggestionsMenu,
  html[data-zb-theme] .TopicSuggestion-Popover,
  html[data-zb-theme] .TopicSuggestion-Popover-container {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-languageSuggestionsInput,
  html[data-zb-theme] .Editable-languageSuggestionsInput input {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Editable-languageSuggestions .Menu-item,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item,
  html[data-zb-theme] .TopicSuggestion-TopicItem,
  html[data-zb-theme] .TopicSuggestion-TopicItem .topic-name {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .pin-count {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .new-topic {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Editable-languageSuggestions .Menu-item:hover,
  html[data-zb-theme] .Editable-languageSuggestions .Menu-item.is-active,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item:hover,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item.is-active {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .EmoticonPopover {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .EmoticonPopover > svg {
    fill: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .EmoticonPopover li:hover,
  html[data-zb-theme] .EmoticonPopover li:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary)
    :where(div, label, svg) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> button.Button--primary)
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button)
    > div,
  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    .Modal-content
    > div
    > div:last-child
    > div:last-child:has(> button)
    > div
    :where(div, span) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> input[placeholder="输入关键字查找图片"]) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> input[placeholder="输入关键字查找图片"]):focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"] {
    box-sizing: border-box !important;
    min-width: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"]
    + button {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    input[placeholder="输入关键字查找图片"]
    + button:hover {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.MaterialLibrary-SearchInputContainer)
    div:has(> div > input[type="file"][multiple])
    > div
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Modal:has(canvas[alt="二维码"]) .Modal-content div {
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
    > div:nth-last-child(2) {
    color: var(--zb-text) !important;
  }

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

  html[data-zb-theme] .VoteTypeSelectorPopover,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:hover,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:focus,
  html[data-zb-theme] .VoteTypeSelectorPopover > div > div:focus-within {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox,
  html[data-zb-theme] .RingSetting-submenuBox {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox > div {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox > div:hover,
  html[data-zb-theme] .CommentSetting-submenuBox > div:focus,
  html[data-zb-theme] .CommentSetting-submenuBox > div:focus-within {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .CommentSetting-submenuBox .ZDI--Check24 {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child,
  html[data-zb-theme] .RingSetting-submenuBox > div:nth-child(3) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child > div:first-child,
  html[data-zb-theme] .RingSetting-submenuBox > div:nth-child(3) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox > div:first-child svg {
    color: var(--zb-text-muted) !important;
    fill: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .RingSetting-submenuBox .Input-wrapper input {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img) {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img):hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:first-child
    > div:first-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:last-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:nth-child(2)
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .RingSetting-submenuBox
    > div:last-child
    > div
    > div:has(> img)
    > div:last-child {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .VoteTypeSelectorPopover
    > div
    > div
    > div:first-child
    > div:last-child {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .VoteTypeSelectorPopover
    > div
    > div
    > div:last-child:not(:first-child) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:first-child {
    background-color: transparent !important;
    border: 0 !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    div:has(> input[type="text"]) {
    box-sizing: border-box !important;
    min-width: 0 !important;
    padding: 0 10px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 4px !important;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    div:has(> input[type="text"]):focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    input[type="text"] {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 0 !important;
    outline: 0 !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    input[type="text"]::placeholder {
    color: var(--zb-text-muted) !important;
  }

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

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child
    div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])
    .Modal-content
    > div
    > div:nth-child(2)
    > div:first-child
    svg {
    color: var(--zb-text-muted) !important;
    fill: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    div:has(> div > input[placeholder^="请填写选项"])
    > div:first-child {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    div:has(> div > input[placeholder^="请填写选项"])
    > div:first-child
    div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div):hover {
    background-color: var(--zb-surface-hover) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder*="投票 标题"])
    .Modal-content
    div:has(> svg.ZDI--Plus24 + div)
    :where(svg, div) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]:has(
      .Modal input[placeholder*="PK 标题"],
      .Modal input[placeholder*="投票 标题"]
    )
    body
    div:has(> svg + div > div:nth-child(8)):not(
      :has(> svg + div > div:nth-child(9))
    ) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    scrollbar-color: var(--ctp-overlay0) transparent;
  }

  html[data-zb-theme]:has(
      .Modal input[placeholder*="PK 标题"],
      .Modal input[placeholder*="投票 标题"]
    )
    body
    div:has(> svg + div > div:nth-child(8)):not(
      :has(> svg + div > div:nth-child(9))
    )
    > svg {
    color: var(--zb-surface) !important;
    fill: var(--zb-surface) !important;
  }

  html[data-zb-theme]:has(
      .Modal input[placeholder*="PK 标题"],
      .Modal input[placeholder*="投票 标题"]
    )
    body
    div:has(> svg + div > div:nth-child(8)):not(
      :has(> svg + div > div:nth-child(9))
    )
    > svg
    + div
    > div {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]:has(
      .Modal input[placeholder*="PK 标题"],
      .Modal input[placeholder*="投票 标题"]
    )
    body
    div:has(> svg + div > div:nth-child(8)):not(
      :has(> svg + div > div:nth-child(9))
    )
    > svg
    + div
    > div:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .VoteButton {
    background-color: var(--zb-primary-soft) !important;
    border-color: transparent !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .VoteButton:hover,
  html[data-zb-theme] .VoteButton[aria-pressed="true"],
  html[data-zb-theme] .VoteButton.is-active {
    background-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .ProfileSideCreator-analytics,
  html[data-zb-theme] .KfeCollection-CreateSaltCard-content {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Topstory-container > .Topstory-mainColumn + *,
  html[data-zb-theme] [data-zb-home-sidebar] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] [data-zb-home-sidebar] :where(div, span) {
    color: inherit !important;
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
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Topstory-container > .Topstory-mainColumn + * .Card,
  html[data-zb-theme] [data-zb-home-sidebar] .Card,
  html[data-zb-theme] [aria-label="创作中心卡片"] {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] [data-zb-home-sidebar] .CreatorEntrance-hint,
  html[data-zb-theme] [data-zb-home-sidebar] .ProfileSideCreator-readCountNumber,
  html[data-zb-theme] [data-zb-home-sidebar] .HotSearchCard-title,
  html[data-zb-theme] [data-zb-home-sidebar] .HotSearchCard-itemText,
  html[data-zb-theme] [data-zb-home-sidebar] .KfeCollection-CreateSaltCard-content-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] [data-zb-home-sidebar] .HotSearchCard-heat,
  html[data-zb-theme] [data-zb-home-sidebar] .KfeCollection-CreateSaltCard-content-sub-title {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .HotSearchCard-tagHot {
    background-color: var(--zb-danger-soft) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme] .HotSearchCard-tagActivity {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .HotSearchCard-dot {
    background-color: var(--zb-warning) !important;
  }

  html[data-zb-theme] blockquote {
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

  html[data-zb-theme] .Skeleton,
  html[data-zb-theme] [class*="Skeleton"],
  html[data-zb-theme] .PlaceHolder,
  html[data-zb-theme] .PlaceHolder-inner {
    background-color: var(--zb-surface-raised) !important;
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
