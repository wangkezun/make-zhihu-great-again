const PALETTE_HEX = {
  latte:
    "rosewater:#dc8a78,flamingo:#dd7878,pink:#ea76cb,mauve:#8839ef,red:#d20f39,maroon:#e64553,peach:#fe640b,yellow:#df8e1d,green:#40a02b,teal:#179299,sky:#04a5e5,sapphire:#209fb5,blue:#1e66f5,lavender:#7287fd,text:#4c4f69,subtext1:#5c5f77,subtext0:#6c6f85,overlay2:#7c7f93,overlay1:#8c8fa1,overlay0:#9ca0b0,surface2:#acb0be,surface1:#bcc0cc,surface0:#ccd0da,base:#eff1f5,mantle:#e6e9ef,crust:#dce0e8",
  frappe:
    "rosewater:#f2d5cf,flamingo:#eebebe,pink:#f4b8e4,mauve:#ca9ee6,red:#e78284,maroon:#ea999c,peach:#ef9f76,yellow:#e5c890,green:#a6d189,teal:#81c8be,sky:#99d1db,sapphire:#85c1dc,blue:#8caaee,lavender:#babbf1,text:#c6d0f5,subtext1:#b5bfe2,subtext0:#a5adce,overlay2:#949cbb,overlay1:#838ba7,overlay0:#737994,surface2:#626880,surface1:#51576d,surface0:#414559,base:#303446,mantle:#292c3c,crust:#232634",
  macchiato:
    "rosewater:#f4dbd6,flamingo:#f0c6c6,pink:#f5bde6,mauve:#c6a0f6,red:#ed8796,maroon:#ee99a0,peach:#f5a97f,yellow:#eed49f,green:#a6da95,teal:#8bd5ca,sky:#91d7e3,sapphire:#7dc4e4,blue:#8aadf4,lavender:#b7bdf8,text:#cad3f5,subtext1:#b8c0e0,subtext0:#a5adcb,overlay2:#939ab7,overlay1:#8087a2,overlay0:#6e738d,surface2:#5b6078,surface1:#494d64,surface0:#363a4f,base:#24273a,mantle:#1e2030,crust:#181926",
  mocha:
    "rosewater:#f5e0dc,flamingo:#f2cdcd,pink:#f5c2e7,mauve:#cba6f7,red:#f38ba8,maroon:#eba0ac,peach:#fab387,yellow:#f9e2af,green:#a6e3a1,teal:#94e2d5,sky:#89dceb,sapphire:#74c7ec,blue:#89b4fa,lavender:#b4befe,text:#cdd6f4,subtext1:#bac2de,subtext0:#a6adc8,overlay2:#9399b2,overlay1:#7f849c,overlay0:#6c7086,surface2:#585b70,surface1:#45475a,surface0:#313244,base:#1e1e2e,mantle:#181825,crust:#11111b",
};

const paletteVariables = Object.fromEntries(
  Object.entries(PALETTE_HEX).map(([flavor, colors]) => [
    flavor,
    colors
      .split(",")
      .map((color) => color.split(":"))
      .map(([name, hex]) => `    --ctp-${name}: ${hex};`)
      .join("\n"),
  ]),
);

const createPaletteVariables = (name) => paletteVariables[name];

const createFlavorRule = (name) => `
  html[data-zb-theme="${name}"] {
${createPaletteVariables(name)}
    color-scheme: ${name === "latte" ? "light" : "dark"};
  }`;

const flavorRules = ["latte", "frappe", "macchiato", "mocha"].map(createFlavorRule).join("\n");

export const CATPPUCCIN_THEME_STYLE = `
${flavorRules}

  html[data-zb-theme="system"] {
${createPaletteVariables("latte")}
    color-scheme: light;
  }

  @media (prefers-color-scheme: dark) {
    html[data-zb-theme="system"] {
${createPaletteVariables("mocha")}
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
    --zb-text-secondary: var(--ctp-subtext1);
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

  html[data-zb-theme]
    .AppHeader
    .SearchBar-searchButton
    .SearchBar-searchIcon {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-searchButton
    .SearchBar-searchIcon.isFocus {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-input--focus
    .SearchBar-searchButton {
    background-color: transparent !important;
    border-color: transparent !important;
  }

  html[data-zb-theme]
    .AppHeader
    .SearchBar-askDropdownButton
    .ZDI--PlusFill24 {
    color: var(--ctp-crust) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .SearchBar-menu .Menu-item:hover,
  html[data-zb-theme] .SearchBar-menu .Menu-item.is-active,
  html[data-zb-theme] .SearchBar-menu .Menu-item:focus,
  html[data-zb-theme] .SearchBar-menu .Menu-item:focus-within {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
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

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input,
  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input {
    box-sizing: border-box !important;
    width: 100% !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input {
    min-height: 46px !important;
    padding: 9px 12px !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input {
    min-height: 104px !important;
    padding: 11px 12px !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input:focus-within,
  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input textarea,
  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input .Editable-content,
  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input .DraftEditor-root,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .AskDetail-input
    .DraftEditor-editorContainer,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .AskDetail-input
    .public-DraftEditor-content,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .AskDetail-input
    .public-DraftEditorPlaceholder-root,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .AskDetail-input
    .public-DraftEditorPlaceholder-inner {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskTitle-input textarea {
    width: 100% !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .AskDetail-input .Editable-content {
    min-height: 80px !important;
  }

  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .public-DraftEditorPlaceholder-inner {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar-controls {
    background-color: transparent !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar .Editable-control {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar .Editable-control:hover,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .Editable-toolbar
    .Editable-control.is-active,
  html[data-zb-theme]
    .Modal:has(.Ask-form)
    .Editable-toolbar
    .Editable-control[aria-pressed="true"] {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Modal:has(.Ask-form) .Editable-toolbar-separator {
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
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
    padding: 10px 12px !important;
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
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
    .InputLike.Editable:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
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

  html[data-zb-theme][data-zb-column-page="true"]
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

  html[data-zb-theme] div:has(> .Modal-content) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Modal .Topbar {
    background-color: var(--zb-surface) !important;
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .Modal-content
    > div
    > div:has(+ div + div > .SendGiftModal-GiftListWrapper),
  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper)
    > button {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-RedpacketListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-RedpacketListWrapper)
    > button:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .Modal-content
    > div
    > div:has(+ div > .SendGiftModal-GiftListWrapper),
  html[data-zb-theme]
    .Modal:has(.SendGiftModal-GiftListWrapper)
    .SendGiftModal-GiftListWrapper
    > div
    > div:last-child {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal
    .SendGiftModal-GiftListWrapper
    > div
    > div:not(:last-child),
  html[data-zb-theme]
    .Modal
    .SendGiftModal-RedpacketListWrapper
    > div
    > div {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal
    .SendGiftModal-RedpacketListWrapper
    > div:not(:empty) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:not(:last-child) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:not(:last-child)
    :where(div, span) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:first-child
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:nth-child(2)
    span {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:last-child {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(> button):last-child
    > div:first-child {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    a[href*="/grapp/protocol/payment"] {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(> button):last-child
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    ):has(a[href*="/grapp/protocol/payment"])
    .Modal-content
    > div
    > div:has(a[href*="/grapp/protocol/payment"])
    > div:first-child
    > div:last-child {
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .Modal:has(
      :is(
        .SendGiftModal-GiftListWrapper,
        .SendGiftModal-RedpacketListWrapper
      )
    )
    .Modal-closeIcon {
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    .Modal-content
    > div
    > div:nth-child(2),
  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    input[placeholder="0"] {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(input[placeholder="0"])
    input[placeholder="0"]::placeholder {
    color: var(--zb-text-subtle) !important;
    -webkit-text-fill-color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .FavlistsModal .Modal-inner {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .FavlistsModal :is(.Modal-title, .Favlists-itemNameText) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Modal-subtitle, .Favlists-itemContent, .Favlists-itemIcon) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-items {
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-item {
    box-sizing: border-box !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 8px 10px !important;
    background-color: transparent !important;
    border-bottom-color: var(--zb-border) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-item:is(:hover, :focus-within) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemInner {
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemName {
    min-width: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-itemNameText {
    min-width: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-updateButton {
    flex: 0 0 76px !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-updateButton.Button--blue,
  html[data-zb-theme] .FavlistsModal .Favlists-addButton {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    border-radius: 6px !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Favlists-updateButton.Button--blue, .Favlists-addButton):hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    :is(.Favlists-updateButton, .Favlists-addButton):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .FavlistsModal .Favlists-actions {
    background-color: var(--zb-surface) !important;
    border-top-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .FavlistsModal .Modal-closeButton {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Modal-closeButton:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-updateButton.Button--grey {
    position: relative !important;
    border-radius: 6px !important;
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }

  html[data-zb-theme]
    .FavlistsModal
    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible)::after {
    content: "取消收藏" !important;
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: var(--zb-danger) !important;
    -webkit-text-fill-color: var(--zb-danger) !important;
    font-size: 14px !important;
    line-height: normal !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    [data-zb-arrow-action-panel-wrapper] {
    background-color: transparent !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    [data-zb-arrow-action-panel] {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    [data-zb-arrow-action-panel]
    > div:nth-child(2) {
    background-color: transparent !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    [data-zb-arrow-action-panel]
    :is(span, button) {
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    [data-zb-arrow-action-panel]
    button {
    box-sizing: border-box !important;
    min-width: max-content !important;
    padding: 4px 8px !important;
    border-radius: 6px !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    [data-zb-arrow-action-panel]
    button:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 6px !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]:is(
      [data-zb-question-page="true"],
      [data-zb-home-page="true"]
    )
    [data-zb-arrow-action-panel]
    :is(svg, path) {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .WriteArea,
  html[data-zb-theme] .Topstory-mainColumnCard {
    background-clip: padding-box !important;
    border-radius: 12px !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    .Popover-arrow::after {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Popover-content > .Popover-arrow::after {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .TooltipContent,
  html[data-zb-theme] .TooltipContent.TooltipContent--white {
    background: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .TooltipContent
    :where(.TooltipContent-children, div, span, p, strong) {
    color: inherit !important;
  }

  html[data-zb-theme] body .TooltipContent.TooltipContent--white,
  html[data-zb-theme] body .TooltipContent.TooltipContent--white * {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme] .TooltipContent .TooltipContent-arrow::after,
  html[data-zb-theme]
    .TooltipContent.TooltipContent--white
    .TooltipContent-arrow::after {
    background: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    :is(
      .PushNotifications-menu,
      .PushNotifications-content,
      .PushNotifications-header,
      .PushNotifications-list,
      .PushNotifications-footer,
      .Notifications-footer,
      .Messages-menu,
      .Messages-content,
      .Messages-header,
      .Messages-list,
      .Messages-footer
    ) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-header, .Messages-header) {
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer) {
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-list, .Messages-list) {
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
  }

  html[data-zb-theme] .PushNotifications-tab,
  html[data-zb-theme] .Messages-tab {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .PushNotifications-tab:hover,
  html[data-zb-theme] .PushNotifications-tab:focus-visible,
  html[data-zb-theme] .Messages-tab:hover,
  html[data-zb-theme] .Messages-tab:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .PushNotifications-selectedTabIcon {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .PushNotifications-item,
  html[data-zb-theme] .Messages-item {
    background-color: transparent !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .PushNotifications-item::after,
  html[data-zb-theme] .Messages-item::after {
    background-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .PushNotifications-item:hover,
  html[data-zb-theme] .PushNotifications-item:focus-visible,
  html[data-zb-theme] .Messages-item:hover,
  html[data-zb-theme] .Messages-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Messages-newItem {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .PushNotifications-actor,
  html[data-zb-theme] .Messages-userName,
  html[data-zb-theme] .Messages-userName a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .PushNotifications-item a {
    color: var(--zb-primary) !important;
    text-decoration-color: transparent !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme] .PushNotifications-item a:hover,
  html[data-zb-theme] .PushNotifications-item a:focus-visible {
    color: var(--zb-primary-hover) !important;
    text-decoration-color: currentColor !important;
  }

  html[data-zb-theme] .Messages-itemContent {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer)
    :is(a.Button, button.Button) {
    background-color: transparent !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    :is(.PushNotifications-menuContainer, .Messages-menuContainer)
    :is(.PushNotifications-footer, .Notifications-footer, .Messages-footer)
    :is(a.Button, button.Button):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .Topstory-mainColumnCard {
    overflow: hidden !important;
    overflow: clip !important;
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

  html[data-zb-theme] .TopstoryItem .RichContent-inner,
  html[data-zb-theme] .TopstoryItem .RichContent-inner .RichText {
    color: var(--zb-text-secondary) !important;
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

  html[data-zb-theme] .Popover-content .Menu > .Menu-item {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    padding-right: 14px !important;
    padding-left: 14px !important;
    border-radius: 4px !important;
  }

  html[data-zb-theme]
    .Popover-content
    .Menu
    > .Menu-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
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
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem,
  html[data-zb-theme] .TopicSuggestion-TopicItem .topic-name {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .pin-count {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .new-topic {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer,
  html[data-zb-theme] .MentionSuggestions-menu {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .AutoComplete-DefaultItem,
  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserItem,
  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserDetail {
    background-color: transparent !important;
    color: inherit !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item:hover,
  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item:focus,
  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item.is-active,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item:hover,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item:focus,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item.is-active {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserName {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserHeadline {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .MentionSuggestions-menu .AutoComplete-UserSocialTag {
    background-color: var(--zb-primary-soft) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 35%, transparent) !important;
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .EmoticonPopover > svg {
    fill: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul {
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:first-child
    li {
    padding-block: 2px !important;
    padding-inline: 3px !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul
    > li {
    background-color: transparent !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .EmoticonPopover
    > div:last-child
    > div:last-child
    > ul
    > .css-1c21y8s {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme] .EmoticonPopover li:hover,
  html[data-zb-theme] .EmoticonPopover li:focus-visible {
    background-color: var(--zb-surface-hover) !important;
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

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder):is(
      :hover,
      :focus-within
    ) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder).active {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Modal .MaterialLibraryNav-Folder .nav-name {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder)
    .nav-num {
    min-width: 20px !important;
    padding-inline: 6px !important;
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text-muted) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    .Modal
    :is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder).active
    .nav-num {
    background-color: var(--zb-surface) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .ReferenceModal :is(.InputLike, .Select-button) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .ReferenceModal
    :is(.InputLike, .Select-button):is(:hover, :focus, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    ) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:first-child
    :where(h1, h2, h3, p, div, span, label) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:first-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    > div:first-child,
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    > div:first-child
    :where(div, span, label) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> div:first-child > h1):has(
      > div:last-child button.Button--primary
    )
    > div:last-child
    a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    > div:first-child {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [dir="auto"] {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"] {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"]:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal:has(.Modal-content > div[class*="r-"])
    .Modal-content
    [tabindex="0"]
    [dir="auto"] {
    color: var(--zb-primary) !important;
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

  html[data-zb-theme] .Editable-videoModal .Modal-inner,
  html[data-zb-theme] .Editable-videoModal .Modal-content {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
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

  /* Profile page */
  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader > .Card,
  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader-wrapper,
  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader-content {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader > .Card {
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-userCover
    :is(.UserCover, .UserCoverGuide) {
    border-radius: 12px 12px 0 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader-wrapper {
    border-radius: 0 0 12px 12px !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader .UserAvatar {
    background-color: var(--zb-surface) !important;
    box-shadow: 0 0 0 4px var(--zb-surface) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    :is(.ProfileHeader-name, .ProfileHeader-detailValue) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    :is(.ProfileHeader-headline, .ProfileHeader-info, .ProfileHeader-detailItem) {
    color: var(--zb-text-secondary) !important;
    -webkit-text-fill-color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    :is(.ProfileHeader-detailLabel, .ProfileHeader-expandButton) {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    .ProfileHeader-expandButton:hover {
    background-color: transparent !important;
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    .ProfileHeader-expandButton:focus-visible {
    border-radius: 6px !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    .ProfileHeader-iconWrapper {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader
    .ProfileHeader-iconWrapper
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileHeader-divider {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .UserCoverGuide-dialog {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .UserCoverGuide-dialog
    :is(.UserCoverGuide-dialogHead, h4) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .UserCoverGuide-dialog
    :is(.UserCoverGuide-dialogContent, .UserCoverGuide-dialogDescription) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .UserCoverGuide-dialog a {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .Button {
    box-sizing: border-box !important;
    min-height: 34px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .FollowButton
    + .Button {
    background-color: transparent !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .FollowButton
    + .Button:hover {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .Button:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileMain {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    :is(.ProfileMain-header, .ProfileMain-tabsWrapper, .ProfileMain-tabs) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileMain-header {
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-link {
    color: var(--zb-text-secondary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-link:hover {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-link.is-active {
    color: var(--zb-primary) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-link:focus-visible {
    border-radius: 6px !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-tabs
    .Tabs-meta {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-header
    div:has(> button :is(.Zi--Search, .ZDI--Search24, [class*="Search"])) {
    background: linear-gradient(
      to left,
      var(--zb-surface) 0,
      var(--zb-surface) 56px,
      transparent 100%
    ) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-header
    button:has(:is(.Zi--Search, .ZDI--Search24, [class*="Search"])) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-header
    button:has(:is(.Zi--Search, .ZDI--Search24, [class*="Search"])):hover {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-header
    button:has(:is(.Zi--Search, .ZDI--Search24, [class*="Search"])):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain-header
    button
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileMain .List-header {
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    :is(.List-header, .List-item)::after {
    background-color: var(--zb-border) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .ProfileMain .List-item {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    > div
    > div
    > div
    > a:first-child
    > div {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    > div
    > div
    > div
    > div:last-child
    > div:last-child
    > a
    > div {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    > div
    > div
    > div
    > div:last-child
    > div:last-child
    > div:last-child,
  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    > div
    > div
    > div
    > div:last-child
    > div:last-child
    > div:last-child
    > div {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-lineComments
    .List-item
    a:hover
    > div {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button:not(.VoteButton) {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button--iconOnly:not(.VoteButton) {
    min-width: 28px !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button:not(.VoteButton):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button:not(.VoteButton):focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button[aria-label="收藏"]:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button[aria-label="已收藏"] {
    color: var(--zb-warning) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button[aria-label="喜欢"]:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button:is(
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    ):has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)) {
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .VoteButton {
    box-sizing: border-box !important;
    height: 34px !important;
    padding-inline: 10px !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .VoteButton:disabled {
    background-color: var(--zb-surface-raised) !important;
    border-color: transparent !important;
    color: var(--zb-text-subtle) !important;
    cursor: not-allowed !important;
    opacity: 0.72 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .Profile-sideColumn {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"] .Profile-sideColumn .Card,
  html[data-zb-theme][data-zb-profile-page="true"] .Profile-sideColumn .Profile-lightList {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(a[href="/creator"], a[href="/question/waiting"]) {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 40px !important;
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

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(a[href="/creator"], a[href="/question/waiting"]):is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(a[href="/creator"], a[href="/question/waiting"]):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(a[href="/creator"], a[href="/question/waiting"])
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(
      .Profile-sideColumnTitle,
      .Profile-sideColumnItemValue,
      .Profile-lightItemValue,
      .NumberBoard-itemValue,
      .ProfileSideCreator-readCountNumber
    ) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(
      .Profile-sideColumnItemTitle,
      .Profile-lightItemName,
      .NumberBoard-itemName,
      .ProfileSideCreator-readCountTitle
    ) {
    color: var(--zb-text-muted) !important;
    -webkit-text-fill-color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(
      .NumberBoard-itemInner,
      .Profile-sideColumnItem,
      .Profile-lightItem
    ) {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(
      .Card-header,
      .Profile-footerOperations,
      .ProfileSideCreator-readCountItem
    ) {
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    .Profile-lightItem {
    border-top: 1px solid var(--zb-border) !important;
    border-bottom: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    .Profile-lightItem:first-child {
    border-top: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(.NumberBoard-item.Button, .Profile-lightItem):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(.NumberBoard-item.Button, .Profile-lightItem):focus-visible {
    border-radius: 6px !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(.Footer, footer) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(.Footer, footer)
    :where(a, button, div, span, p, svg) {
    color: inherit !important;
  }

  /* Question page */
  html[data-zb-theme] .QuestionHeader,
  html[data-zb-theme] .QuestionHeader-content,
  html[data-zb-theme] .QuestionHeader-main,
  html[data-zb-theme] .QuestionHeader-side,
  html[data-zb-theme] .QuestionHeader-footer,
  html[data-zb-theme] .QuestionHeader-footer-inner,
  html[data-zb-theme] .QuestionHeader-footer-main {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionHeader {
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .QuestionHeader-title,
  html[data-zb-theme] .QuestionHeader-title a,
  html[data-zb-theme] .QuestionHeader-detail,
  html[data-zb-theme] .QuestionHeader-detail .RichText,
  html[data-zb-theme] .QuestionHeader .NumberBoard-itemValue {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-itemName,
  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts,
  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts div,
  html[data-zb-theme] .QuestionHeader .QuestionHeaderActions-label {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-item {
    border-radius: 8px !important;
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-counts {
    column-gap: 8px !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionFollowStatus-counts
    .NumberBoard-itemInner {
    border-left-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .QuestionHeader .NumberBoard-item.Button:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .NumberBoard-item.Button:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-people {
    padding-right: 8px !important;
    padding-left: 8px !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme] .QuestionHeader .QuestionFollowStatus-people:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionFollowStatus-people:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  /* Topic entity cards use generated class names. Target the semantic label
     and direct-child position so the selector survives Zhihu CSS rebuilds
     without also matching the compact topic chips above the question. */
  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-text) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:first-of-type,
  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    .topicMetaTitle {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:first-of-type
    > div:last-child,
  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:first-of-type
    > div:first-child
    > div:not(.topicMetaTitle) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:first-of-type
    span {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:last-of-type
    > button {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:last-of-type
    > button:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader-main
    > a[aria-label^="话题 "][href*="/topic/"]
    > div:last-of-type
    > button[aria-pressed="true"] {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  /* Latest-progress cards use generated class names and receive analytics
     attributes during hydration. Anchor to the server-rendered semantic icon
     so the title color applies on the first paint instead of after hydration. */
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child,
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child
    :where(div, span) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a
    > div:last-child
    svg {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible)
    > div:last-child,
  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:is(:hover, :focus-visible)
    > div:last-child
    :where(div, span, svg) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Card:has(> div:first-child .Zi--LabelSpecial)
    > div:last-child
    > div
    > a:focus-visible {
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  /* Question and answer page links follow semantic roles instead of Zhihu's
     native blue palette. Keep identity links calm, metadata subdued, and
     reserve the accent color for topics, content links, and interaction. */
  html[data-zb-theme] .QuestionHeader-topics :is(a, .TopicLink, .Tag-content),
  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content)
    :where(span, div) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content):hover,
  html[data-zb-theme]
    .QuestionHeader-topics
    :is(a, .TopicLink, .Tag-content):hover
    :where(span, div) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .QuestionHeader-topics .QuestionTopic {
    background-color: var(--zb-primary-soft) !important;
    border-color: transparent !important;
  }

  html[data-zb-theme]
    .QuestionHeader-topics
    .QuestionTopic:is(:hover, :focus-within) {
    background-color: color-mix(
      in srgb,
      var(--zb-primary) 24%,
      transparent
    ) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"]) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 10px !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    > svg {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a {
    box-sizing: border-box !important;
    width: calc(100% - 12px) !important;
    margin-right: 6px !important;
    margin-left: 6px !important;
    background-color: transparent !important;
    border-radius: 6px !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a:focus-visible {
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > div:first-of-type {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > div:last-of-type {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > svg:first-child {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])
    a
    > svg:last-child {
    color: var(--zb-text-muted) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .BrandQuestionSymbol-name,
      .AuthorInfo-name a,
      .UserLink-link
    ) {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .BrandQuestionSymbol-name,
      .AuthorInfo-name a,
      .UserLink-link
    ):hover {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-time, .ContentItem-time a) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-time
    a:hover {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag),
  html[data-zb-theme] .QuestionHeader-detail .RichText a,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord {
    color: var(--zb-primary) !important;
    text-decoration-color: transparent !important;
    text-decoration-thickness: 1px !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag):hover,
  html[data-zb-theme]
    .QuestionPage
    :is(.RichText, .RichContent-inner)
    a:not(.UserLink-link):not(.TopicLink):not(.LinkCard):not(.tag):focus-visible,
  html[data-zb-theme] .QuestionHeader-detail .RichText a:hover,
  html[data-zb-theme] .QuestionHeader-detail .RichText a:focus-visible,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord:hover,
  html[data-zb-theme] .QuestionPage a.RichContent-EntityWord:focus-visible {
    color: var(--zb-primary-hover) !important;
    text-decoration: underline !important;
    text-decoration-color: currentColor !important;
    text-decoration-thickness: 1px !important;
    text-underline-offset: 2px !important;
  }

  html[data-zb-theme] .QuestionPage .RichText a.LinkCard {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .RichText
    a.LinkCard:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-desc {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard-image {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText .LinkCard .tag {
    background-color: var(--zb-primary-soft) !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichText table {
    border: 1px solid var(--zb-border) !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    border-radius: 10px !important;
    color: var(--zb-text) !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .QuestionPage .RichText :is(th, td) {
    background-color: transparent !important;
    border: 0 !important;
    border-right: 1px solid var(--zb-border) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText th {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .QuestionPage .RichText tr > :last-child {
    border-right: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .RichText
    tbody
    tr:last-child
    > td {
    border-bottom: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    div:has(
      > div
        > a[href*="zhida_source=below_banner_question"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"] {
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]
    > p {
    color: inherit !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]:is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-surface-hover) !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a[href*="zhida_source=below_banner_question"]
    :is(svg, path) {
    color: var(--zb-primary) !important;
    fill: currentColor !important;
    stroke: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(
      .BrandQuestionSymbol-brandLink,
      .AuthorInfo-name a,
      .UserLink-link,
      .ContentItem-time a,
      .QuestionHeader-topics a,
      .RelatedQuestions-item a,
      .SimilarQuestions-item a,
      .NumberBoard-item
    ):focus-visible {
    color: var(--zb-primary) !important;
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .BrandQuestionSymbol-brandLink:is(:hover, :focus-visible)
    .BrandQuestionSymbol-name {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .QuestionPage img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem .AuthorInfo, .AnswerAuthor)
    img.Avatar {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AuthorInfo
    .UserLink:focus-visible {
    border-radius: 6px !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    div[style*="cursor: pointer"]:has(
      > svg.Zi:is(.Zi--ArrowDown, .Zi--ArrowUp)
    ) {
    box-sizing: border-box !important;
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid color-mix(in srgb, var(--zb-primary) 28%, transparent) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    div[style*="cursor: pointer"]:has(
      > svg.Zi:is(.Zi--ArrowDown, .Zi--ArrowUp)
    )
    :is(div, svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    div[style*="cursor: pointer"]:has(
      > svg.Zi:is(.Zi--ArrowDown, .Zi--ArrowUp)
    ):hover {
    background-color: color-mix(in srgb, var(--zb-primary) 24%, transparent) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 48%, transparent) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    :is(
      a:has(> .ZDI--CrabFill24):has(> .Zi--ArrowRight),
      a:has(> .ZDI--ColumnFill24):has(> .ZDI--ArrowRight16)
    ) {
    box-sizing: border-box !important;
    background-color: var(--zb-primary-soft) !important;
    border: 1px solid color-mix(in srgb, var(--zb-primary) 28%, transparent) !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    :is(
      a:has(> .ZDI--CrabFill24):has(> .Zi--ArrowRight),
      a:has(> .ZDI--ColumnFill24):has(> .ZDI--ArrowRight16)
    )
    :is(div, svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    :is(
      a:has(> .ZDI--CrabFill24):has(> .Zi--ArrowRight),
      a:has(> .ZDI--ColumnFill24):has(> .ZDI--ArrowRight16)
    ):is(:hover, :focus-visible) {
    background-color: color-mix(in srgb, var(--zb-primary) 24%, transparent) !important;
    border-color: color-mix(in srgb, var(--zb-primary) 48%, transparent) !important;
    color: var(--zb-primary) !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .ContentItem-meta
    :is(
      a:has(> .ZDI--CrabFill24):has(> .Zi--ArrowRight),
      a:has(> .ZDI--ColumnFill24):has(> .ZDI--ArrowRight16)
    ):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    > svg {
    color: var(--zb-surface-raised) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    div[style*="cursor: default"],
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    div[style*="cursor: default"]
    * {
    color: var(--zb-text) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    div[style*="cursor: default"]
    + div,
  html[data-zb-theme]
    body
    > div
    > div
    > div:has(> svg[viewBox="0 0 26 10"]):has(
      div[style*="cursor: default"]
    )
    div[style*="cursor: default"]
    + div
    * {
    color: var(--zb-text-secondary) !important;
    font-weight: 400 !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .Button:not(.Button--blue),
  html[data-zb-theme] .QuestionHeaderActions .Button:not(.Button--blue) {
    background-color: transparent !important;
    border-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .QuestionHeader-footer .Button:not(.Button--blue):hover,
  html[data-zb-theme] .QuestionHeaderActions .Button:not(.Button--blue):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
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

  html[data-zb-theme] .QuestionHeader .FollowButton.Button--blue,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .QuestionHeader .FollowButton.Button--blue:hover,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .QuestionHeader .WriteAnswerButton,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .WriteAnswerButton {
    background-color: transparent !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .QuestionHeader .WriteAnswerButton:hover,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .WriteAnswerButton:hover {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme] .QuestionHeader .FollowButton.Button--grey,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .FollowButton.Button--grey:is(:hover, :focus-visible),
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    :is(.FollowButton, .WriteAnswerButton):focus-visible,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .FollowButton.Button--grey:focus-visible,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .FollowButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
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
    color: inherit !important;
    fill: currentColor !important;
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
    > .Button:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
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
    color: inherit !important;
    fill: currentColor !important;
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
    .AppHeader:has(.PageHeader.is-shown) {
    box-shadow:
      0 10px 0 var(--zb-page),
      var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    :is(.FollowButton, .WriteAnswerButton)
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-title,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-item > a,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemText,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-itemText a {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Question-sideColumn .HotSearchCard {
    border-radius: 12px !important;
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

  html[data-zb-theme] .Question-sideColumn .HotSearchCard-tag {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: 24px !important;
    padding: 0 5px !important;
    white-space: nowrap !important;
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
    ):is(:hover, :focus-within) {
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
    .NumberBoard-item:hover {
    background-color: var(--zb-surface-raised) !important;
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

  html[data-zb-theme] div:has(> .HoverCard-item) {
    background-color: var(--zb-surface) !important;
    background-clip: padding-box !important;
    padding-right: 16px !important;
    padding-left: 16px !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .Avatar {
    top: -8px !important;
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) div:has(> .Avatar) {
    padding-bottom: 21px !important;
    border-bottom-color: var(--zb-border) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .HoverCard-description {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .UserLink-link {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .UserLink-link:is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .NumberBoard-itemName {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .NumberBoard-itemValue {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .NumberBoard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .HoverCard-buttons {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .HoverCard-buttons .Button {
    box-sizing: border-box !important;
    min-width: 0 !important;
    width: auto !important;
    margin: 0 !important;
    border-radius: 6px !important;
    flex: 1 1 0 !important;
    font-weight: 500 !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .NumberBoard-item {
    border-radius: 8px !important;
  }

  html[data-zb-theme] div:has(> .HoverCard-item) .NumberBoard-item:hover {
    background-color: var(--zb-surface-raised) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .NumberBoard-item:focus-visible {
    background-color: var(--zb-surface-raised) !important;
    box-shadow: inset 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .FollowButton.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .Button:not(.FollowButton) {
    background-color: transparent !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons
    .Button:not(.FollowButton):is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons:has(> .Button:only-child)
    > .Button.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons:has(> .Button:only-child)
    > .Button.Button--grey {
    position: relative !important;
    height: 34px !important;
    min-height: 34px !important;
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons:has(> .Button:only-child)
    > .Button.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: transparent !important;
  }

  html[data-zb-theme]
    div:has(> .HoverCard-item)
    .HoverCard-buttons:has(> .Button:only-child)
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
  html[data-zb-theme] .AnswerList .Select-button:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
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
    .Select-button:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .AnswersNavWrapper
    .List-headerOptions
    .Select-button
    svg {
    width: 14px !important;
    height: 14px !important;
    margin-left: 6px !important;
    color: inherit !important;
    fill: currentColor !important;
    flex: 0 0 14px !important;
  }

  html[data-zb-theme] .Select-option {
    background-color: transparent !important;
    color: var(--zb-text) !important;
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
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton) {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    border-radius: 6px !important;
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
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
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
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    -webkit-text-fill-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionRichText--collapsed:is(:hover, :focus-within) {
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionRichText-more.Button:focus-visible,
  html[data-zb-theme]
    body
    .QuestionPage
    .AnswerItem
    .ContentItem-expandButton.Button:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionHeader
    .QuestionRichText-more.Button
    svg {
    width: 16px !important;
    height: 16px !important;
    margin-left: 4px !important;
    color: inherit !important;
    fill: currentColor !important;
    flex: 0 0 16px !important;
  }

  html[data-zb-theme] .QuestionPage .VoteButton {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .RichContent-actions.is-fixed {
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
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button[aria-label="收藏"]:is(:hover, :focus-visible)
    .Zi--Star,
  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button[aria-label="已收藏"]
    .Zi--Star {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
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

  html[data-zb-theme] .Question-mainColumn .AnswersNavWrapper,
  html[data-zb-theme] .Question-mainColumn .AnswersNavWrapper > .List {
    background-color: transparent !important;
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
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme]
    .Question-mainColumn
    .AnswersNavWrapper
    .List-item:hover {
    border-color: var(--zb-border-strong) !important;
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
    :is(.List-header, .List-item)::after {
    border-bottom-color: var(--zb-border) !important;
  }

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
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    :is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)
    .FollowButton
    svg {
    color: inherit !important;
    fill: currentColor !important;
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
    .AnswerAuthor-buttons
    .Button:not(.FollowButton):hover {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor-buttons
    .Button:not(.FollowButton):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor-buttons
    .Button:not(.FollowButton)
    svg {
    color: inherit !important;
    fill: currentColor !important;
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

  html[data-zb-theme] .CornerButton {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .CornerButton:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .CornerButton svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .Comments-container::before,
  html[data-zb-theme] .Comments-container::after {
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme]
    .ContentItem-action:has(.ZDI--ChatBubbleFill24)::after {
    border: 0 !important;
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme] .QuestionPage .RichContent--hasHotComment {
    padding-bottom: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)),
  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    .QuestionPage
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)):is(
      :hover,
      :focus-visible
    ),
  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar)):is(
      :hover,
      :focus-visible
    ) {
    background-color: transparent !important;
    color: var(--zb-primary-hover) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .List-item:has(.Comments-container) {
    overflow: clip !important;
  }

  html[data-zb-theme]
    .QuestionPage
    img:is(.lazy, .origin_image.zh-lightbox-thumb) {
    animation: none !important;
    opacity: 1 !important;
    transition: none !important;
  }

  html[data-zb-theme] .Comments-container,
  html[data-zb-theme] .Comments-container > div {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Comments-container {
    border: 0 !important;
    border-radius: 8px !important;
    box-shadow: none !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Comments-container > div:first-child {
    border: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    outline: 0 !important;
    padding-bottom: 0 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:has(.InputLike.Editable) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:first-child:has(.InputLike.Editable) {
    bottom: 0 !important;
    border-top: 0 !important;
    box-shadow: 0 -6px 12px
      color-mix(in srgb, var(--ctp-crust) 14%, transparent) !important;
    margin-bottom: 0 !important;
    margin-inline: -20px !important;
    order: 100 !important;
    padding: 10px 20px !important;
    position: sticky !important;
    top: auto !important;
    transform: none !important;
    z-index: 3 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:first-child:has(.InputLike.Editable)
    > div:first-child {
    margin-bottom: 0 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:has(.InputLike.Editable):not(:has([data-id])):not(:first-child) {
    display: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2) {
    border: 1px solid var(--zb-border-strong) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24) {
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
    margin: 10px auto !important;
    min-height: 44px !important;
    padding: 6px 10px !important;
    width: fit-content !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24)::before {
    border: 0 !important;
    content: none !important;
    display: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:has(> .ZDI--ArrowRightSmall24):is(
      :hover,
      :focus-within,
      :active
    ) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child {
    border-bottom-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:first-child
    :where(div, span) {
    color: var(--zb-text-muted) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > .css-m0zh86,
  html[data-zb-theme]
    .Comments-container
    > div:first-child
    > div:nth-child(2)
    > div:first-child
    > div:last-child
    > div:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme] .Comments-container .CommentContent {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Comments-container
    a:not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:not(.Button--blue) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(.Button--withLabel, .Button--secondary) {
    box-sizing: border-box !important;
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    min-height: 32px !important;
    padding-inline: 10px !important;
  }

  html[data-zb-theme]
    .Comments-container
    [data-id]
    > .Button.Button--secondary {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    margin-top: -4px !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Comments-container
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    )
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Comments-container
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

  html[data-zb-theme] .Comments-container [data-id] {
    border-bottom: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Comments-container [data-id] [data-id] {
    border-bottom-color: transparent !important;
    position: relative !important;
  }

  html[data-zb-theme] .Comments-container [data-id] [data-id]::before {
    border-top: 1px solid var(--zb-border-strong) !important;
    content: "" !important;
    left: 34px !important;
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
  }

  html[data-zb-theme] .Comments-container img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable)
    > div:first-child {
    border-radius: 6px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .Comments-container .InputLike.Editable {
    background-color: var(--zb-surface) !important;
    border-color: transparent !important;
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text) !important;
    padding-inline: 8px !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(.public-DraftEditorPlaceholder-root, .public-DraftEditorPlaceholder-inner) {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme]
    .Comments-container
    .InputLike.Editable:focus-within {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div > div > .InputLike.Editable:focus-within) {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(
      .Skeleton,
      [class*="skeleton" i],
      .PlaceHolder,
      .PlaceHolder-inner,
      [class*="placeholder" i]:not([class*="DraftEditorPlaceholder"]),
      [aria-busy="true"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Comments-container .PlaceHolder-bg {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme]
    .Comments-container
    :is(.PlaceHolder-mask, .PlaceHolder-mask path) {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"]) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > div:first-child {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > svg,
  html[data-zb-theme]
    .Comments-container
    div:has(> div + svg[width="656"][height="44"])
    > svg
    path {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Comments-container
    div:has(
      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]
    ) {
    background-color: var(--zb-surface) !important;
    border: 0 !important;
    box-shadow: none !important;
    color: var(--zb-text-muted) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Comments-container .BounceLoading {
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .Comments-container .BounceLoading-child {
    background-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Comments-container
    button:has(.ZDI--ArrowUpSmall24)
    > span:has(.ZDI--ArrowUpSmall24),
  html[data-zb-theme] .Comments-container .ZDI--ArrowUpSmall24 {
    display: none !important;
  }

  html[data-zb-theme] .Modal-content:has(.CommentContent) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Modal-content:has(.CommentContent) {
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:last-child
    > .css-m0zh86 {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:first-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:first-child
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div:has(> div:nth-child(2) > div:nth-child(3) [data-id])
    > div:first-child
    > div:only-child {
    box-sizing: border-box !important;
    padding: 4px 8px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:nth-child(2):has(> div:nth-child(3) [data-id])
    > div:nth-child(2)
    > div:only-child {
    color: var(--zb-text-muted) !important;
    opacity: 1 !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    > div
    > div:first-child
    > div:last-child
    > div:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .CommentContent {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    a:not(:has(img.Avatar)) {
    color: var(--zb-primary) !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:not(.Button--blue) {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
    cursor: pointer !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:is(.Button--withLabel, .Button--secondary) {
    box-sizing: border-box !important;
    border-radius: 6px !important;
    color: var(--zb-text-secondary) !important;
    min-height: 32px !important;
    padding-inline: 10px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    ) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    outline-color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button:is(.Button--withLabel, .Button--secondary):is(
      :hover,
      :focus-visible
    )
    svg {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
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

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    [data-id] {
    border-bottom: 1px solid var(--zb-border-strong) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    [data-id]
    > div:first-child {
    animation: none !important;
    background-color: transparent !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    [data-id]
    [data-id] {
    border-bottom-color: transparent !important;
    position: relative !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    [data-id]
    [data-id]::before {
    border-top: 1px solid var(--zb-border-strong) !important;
    content: "" !important;
    left: 34px !important;
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    div:has(> div > div > .InputLike.Editable) {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    div:has(> div > div > .InputLike.Editable)
    > div:first-child {
    border-radius: 6px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .InputLike.Editable {
    background-color: var(--zb-surface) !important;
    border-color: transparent !important;
    border-radius: 6px !important;
    box-sizing: border-box !important;
    color: var(--zb-text) !important;
    padding-inline: 8px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .Button.Button--primary {
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {
    background-color: transparent !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    .InputLike.Editable:focus-within {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    div:has(> div > div > .InputLike.Editable:focus-within) {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    div[data-zb-comment-composer-collapsed]
    > div:nth-child(2) {
    display: none !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.CommentContent)
    :is(.public-DraftEditorPlaceholder-root, .public-DraftEditorPlaceholder-inner) {
    background-color: transparent !important;
    color: var(--zb-text-subtle) !important;
  }

  /* Keep the comment theme active while sorting temporarily unmounts CommentContent. */
  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar) {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:first-child {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:first-child
    :where(div, span) {
    color: inherit !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:last-child {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:last-child
    > div {
    background-color: transparent !important;
    border-radius: 4px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:first-child
    > div:last-child
    > .css-m0zh86 {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
    font-weight: 600 !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    :is(
      .Skeleton,
      [class*="skeleton" i],
      .PlaceHolder,
      .PlaceHolder-inner,
      [class*="placeholder" i]:not([class*="DraftEditorPlaceholder"]),
      [class*="loading" i],
      [aria-busy="true"]
    ) {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    .PlaceHolder-bg {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    :is(.PlaceHolder-mask, .PlaceHolder-mask path) {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"]) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-surface) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > div:first-child {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > svg,
  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    > div
    > div:nth-child(2)
    div:has(> div + svg[width="656"][height="44"])
    > svg
    path {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    img.Avatar {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme]
    .Modal-content:has(.InputLike.Editable):has(img.Avatar)
    .comment_img {
    background-color: var(--zb-surface-raised) !important;
    border-radius: 6px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .QuestionPage .AnswerFormPortalContainer,
  html[data-zb-theme] .QuestionPage .QuestionAnswers-statusWrapper,
  html[data-zb-theme] .QuestionPage .AnswerAdd,
  html[data-zb-theme] .QuestionPage .AnswerForm,
  html[data-zb-theme] .QuestionPage .AnswerFormEditorContainer,
  html[data-zb-theme] .QuestionPage .AnswerForm-editor {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
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
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
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
    background-color: var(--zb-surface) !important;
    border-bottom: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
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
    > div:nth-child(2) {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
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
    :is(.Editable-control, .Button:not(.Button--blue)):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
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
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {
    background-color: transparent !important;
    color: var(--zb-text) !important;
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
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AnswerFormEditorContainer
    > div:has([role="combobox"])
    [role="combobox"] {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
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
    > div:first-child
    button
    :is(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
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
    > div:is(:hover, :focus-within) {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
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
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    color: var(--zb-text) !important;
    border-radius: 10px !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    div:has(
      > textarea[placeholder="请描述你想要配图的内容"]
    ):focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme]
    .QuestionPage
    .AIAssistantPanelV2-container
    textarea[placeholder="请描述你想要配图的内容"] {
    background-color: transparent !important;
    color: var(--zb-text) !important;
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
    > div {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
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
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text) !important;
    border-radius: 8px !important;
  }

  html[data-zb-theme]
    .DraftHistoryModal
    .PreviewEditableInstance
    :is(.Editable-content, .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-content) {
    background-color: transparent !important;
    color: var(--zb-text) !important;
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
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
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

  html[data-zb-theme] .Answers-select,
  html[data-zb-theme] .Answers-select .Select-option {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .Answers-select {
    min-width: 116px !important;
    padding: 4px !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    box-shadow: var(--zb-shadow) !important;
  }

  html[data-zb-theme] .Answers-select .Select-option {
    height: 34px !important;
    min-height: 34px !important;
    padding: 0 12px !important;
    border-radius: 4px !important;
    font-size: 14px !important;
    line-height: 34px !important;
  }

  html[data-zb-theme] .Answers-select .Select-option:hover,
  html[data-zb-theme] .Answers-select .Select-option:focus,
  html[data-zb-theme] .Answers-select .Select-option:focus-visible,
  html[data-zb-theme] .Answers-select .Select-option.is-selected,
  html[data-zb-theme] .Answers-select .Select-option[aria-selected="true"] {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .ShareMenu-content,
  html[data-zb-theme] .ShareMenu-menuItems,
  html[data-zb-theme] .ShareMenu-qrcodeBox {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .ShareMenu-button {
    background-color: transparent !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .ShareMenu-button:hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .ShareMenu-qrcodeSection {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .ShareMenu-divider {
    background-color: var(--zb-border) !important;
  }

  html[data-zb-theme] .ShareMenu-qrcodeText {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    .Topstory-mainColumnCard:is(
      :has(.Topstory-hot),
      :has(.hot-column-container)
    ),
  html[data-zb-theme]
    .Topstory-mainColumnCard:is(
      :has(.Topstory-hot),
      :has(.hot-column-container)
    )
    > .Topstory-content {
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
  }

  html[data-zb-theme]
    .Topstory-content
    > div
    > div:has(+ .Topstory-hot) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    margin-bottom: 12px !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme]
    .Topstory-content
    > div
    > div:has(+ .Topstory-hot)
    div {
    background-color: transparent !important;
    border-color: var(--zb-border) !important;
  }

  html[data-zb-theme]
    .Topstory-content
    > div
    > div:has(+ .Topstory-hot)
    a
    + a {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .Topstory-hot,
  html[data-zb-theme] .Topstory-hot .HotList-list {
    background-color: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .Topstory-hot {
    padding-right: 0 !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem {
    box-sizing: border-box !important;
    width: 100% !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    color: var(--zb-text) !important;
    box-shadow: var(--zb-shadow) !important;
    margin-left: 0 !important;
    margin-bottom: 10px !important;
    overflow: hidden !important;
    overflow: clip !important;
    padding: 16px !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem:hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem:focus-visible {
    border-color: var(--zb-primary) !important;
    box-shadow:
      var(--zb-shadow),
      0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .Topstory-hot
    .HotItem
    > .HotItem-content
    > a:is(:hover, :focus-visible)
    .HotItem-title {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-excerpt {
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-metrics,
  html[data-zb-theme] .Topstory-hot .HotItem-action .Button {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-rank:not(.HotItem-hot) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-rank.HotItem-hot {
    color: var(--zb-warning) !important;
  }

  html[data-zb-theme] .Topstory-hot .HotItem-label {
    background-color: var(--zb-warning) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme] .hot-column-container {
    box-sizing: border-box !important;
    height: auto !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    margin-bottom: 12px !important;
    padding-bottom: 0 !important;
    overflow: hidden !important;
    overflow: clip !important;
  }

  html[data-zb-theme] .hot-column {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme] .hot-column .column-title,
  html[data-zb-theme] .hot-column .card .title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .hot-column .sub-title,
  html[data-zb-theme] .hot-column .card :is(.name, .topic) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .hot-column .card {
    box-sizing: border-box !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease !important;
  }

  html[data-zb-theme] .hot-column .card:is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .hot-column .card a:focus-visible {
    outline: 2px solid var(--zb-primary) !important;
    outline-offset: 2px !important;
  }

  html[data-zb-theme] .hot-column .line {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .hot-column-container .more-container {
    box-sizing: border-box !important;
    position: static !important;
    height: auto !important;
    min-height: 0 !important;
    padding: 12px 16px 16px !important;
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme] .hot-column-container .more {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 4px !important;
    min-width: 96px !important;
    min-height: 34px !important;
    padding: 0 12px !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 32px !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme]
    .hot-column-container
    .more:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .hot-column-container .more:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme] .hot-column-container .more :is(svg, path) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme] .hot-column-container .more svg {
    width: 14px !important;
    height: 14px !important;
    flex: 0 0 14px !important;
  }

  html[data-zb-theme] .recommend-column {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  html[data-zb-theme] .recommend-column > div:first-child {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }

  html[data-zb-theme] .recommend-column-content {
    width: 100% !important;
  }

  html[data-zb-theme] .recommend-column .subscrib-card {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    margin-bottom: 12px !important;
    overflow: hidden !important;
    overflow: clip !important;
    padding: 16px !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme]
    .recommend-column
    .subscrib-card:is(:hover, :focus-within) {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .recommend-column .subscrib-card .card-top {
    margin-top: 0 !important;
  }

  html[data-zb-theme] .recommend-column .column-title,
  html[data-zb-theme] .recommend-column .title,
  html[data-zb-theme] .recommend-column .content-title {
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    .recommend-column
    :is(
      .author-name,
      .author-des,
      .column-info,
      .column-des-text,
      .article-text
    ) {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .recommend-column .divider {
    background-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme] .recommend-column .subscrib-btn {
    background-color: var(--zb-primary-soft) !important;
    border-color: transparent !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme]
    .recommend-column
    .subscrib-btn:is(:hover, :focus-visible) {
    background-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumnCard,
  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumnCard
    > .Topstory-content {
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    > div {
    background-color: var(--zb-surface) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :is(a[href="/ring"], a[href*="/ring/host/"]) {
    color: var(--zb-text) !important;
    transition:
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :is(a[href="/ring"], a[href*="/ring/host/"]):is(:hover, :focus-visible) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :is(a[href="/ring"], a[href*="/ring/host/"]):focus-visible {
    border-radius: 8px !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    a[href^="https://www.zhihu.com/pin/"]
    > div {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-secondary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .Modal-inner {
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinV2-Form {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border-strong) !important;
    border-radius: 8px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    :is(.TitleArea, .EditorArea .InputLike.Editable) {
    box-sizing: border-box !important;
    background-color: var(--zb-surface-raised) !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    transition:
      background-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .TitleArea {
    border-bottom: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    :is(.TitleArea, .EditorArea .InputLike.Editable):focus-within {
    background-color: var(--zb-surface-hover) !important;
    box-shadow: inset 0 0 0 1px var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    :is(
      .TitleArea textarea,
      .Editable-content,
      .DraftEditor-root,
      .DraftEditor-editorContainer,
      .public-DraftEditor-content
    ) {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--zb-text) !important;
    box-shadow: none !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    :is(
      .TitleArea textarea::placeholder,
      .public-DraftEditorPlaceholder-root,
      .public-DraftEditorPlaceholder-inner
    ) {
    color: var(--zb-text-subtle) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    > div,
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    + div
    > div {
    box-sizing: border-box !important;
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    color: var(--zb-text-secondary) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    > div
    :where(div, span, svg),
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    + div
    > div
    :where(div, span, svg) {
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    > div:is(:hover, :focus-within),
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .RingSetting
    + div
    > div:is(:hover, :focus-within) {
    background-color: var(--zb-surface-hover) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinToolbar {
    border-top: 1px solid var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinToolbar
    .Button--plain {
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinToolbar
    .Button--plain:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .WritePinToolbar
    .Button--plain:focus-visible,
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .Modal-closeButton:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .Modal-closeButton {
    border-radius: 999px !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    .Modal:has(.WritePinV2-Form)
    .Modal-closeButton:is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"] #TopstoryContent .List {
    padding: 0 10px 10px !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :has(> .List)
    > :first-child
    > div
    > div
    > div {
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border) !important;
    box-shadow: var(--zb-shadow) !important;
    color: var(--zb-text-muted) !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    :has(> .List)
    > :first-child
    > div
    > div
    > div:is(:hover, :focus-within) {
    border-color: var(--zb-primary) !important;
    box-shadow:
      var(--zb-shadow),
      0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item {
    box-sizing: border-box !important;
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
    box-shadow: var(--zb-shadow) !important;
    margin-bottom: 10px !important;
    overflow: hidden !important;
    overflow: clip !important;
    transition: border-color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item:is(:hover, :focus-within) {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item::after {
    display: none !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .PinToolbar-actions {
    background-color: transparent !important;
    border-top: 1px solid var(--zb-border) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .PinItem
    button:not(.Button) {
    background-color: var(--zb-primary) !important;
    border: 1px solid var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .PinItem
    button:not(.Button):hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .PinItem
    button:not(.Button):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .ContentItem-actions
    .Button:not(.VoteButton) {
    border-radius: 6px !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .ContentItem-actions
    .Button:not(.VoteButton):is(:hover, :focus-visible) {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .ContentItem-actions
    .Button:not(.VoteButton):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    :is(.ContentItem-more, .RichContent-inner a) {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    :is(.ContentItem-more, .RichContent-inner a):is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .Button[aria-label="已收藏"],
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .Button[aria-label="收藏"]:is(:hover, :focus-visible) {
    color: var(--zb-warning) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    :is(.Button--red, .Button[aria-label="取消喜欢"]),
  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    .Button[aria-label="喜欢"]:is(:hover, :focus-visible) {
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme][data-zb-ring-feeds-page="true"]
    #TopstoryContent
    .List
    > .List-item
    :is(
      .Button[aria-label="已收藏"],
      .Button[aria-label="收藏"]:is(:hover, :focus-visible),
      .Button--red,
      .Button[aria-label="取消喜欢"],
      .Button[aria-label="喜欢"]:is(:hover, :focus-visible)
    )
    svg {
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumn
    > .WriteArea {
    box-sizing: border-box !important;
    border: 1px solid var(--zb-border) !important;
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumn
    > .WriteArea:hover {
    border-color: var(--zb-border-strong) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumn
    > .WriteArea:focus-within {
    border-color: var(--zb-primary) !important;
    box-shadow:
      var(--zb-shadow),
      0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-mainColumn
    > .WriteArea
    > div
    > div:has(> img[src*="/heifetz/assets/"])::after {
    border-top-color: var(--zb-border) !important;
  }

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
  html[data-zb-theme] .TopstoryItem.TopstoryItem-isFollow:focus-visible {
    border-color: var(--zb-primary) !important;
    box-shadow:
      var(--zb-shadow),
      0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-title,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-title
    a,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-title,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-title
    a {
    color: var(--zb-primary) !important;
    transition: color 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-title:is(:hover, :focus-within),
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-title
    a:is(:hover, :focus-visible),
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-title:is(:hover, :focus-within),
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-title
    a:is(:hover, :focus-visible) {
    color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .FollowButton.Button--blue {
    box-sizing: border-box !important;
    border: 1px solid var(--zb-primary) !important;
    border-radius: 999px !important;
    font-weight: 500 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      box-shadow 0.16s ease !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue:hover,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .FollowButton.Button--blue:hover {
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .Topstory-container
    .FollowButton.Button--blue:focus-visible,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .FollowButton.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton),
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button:not(.VoteButton) {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    border-radius: 6px !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-more {
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-size: 14px !important;
    line-height: 22px !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more:is(:hover, :focus-visible),
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-more:is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more:focus-visible,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-more:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):hover,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):focus-visible,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):focus-visible {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button[aria-label="收藏"]:is(:hover, :focus-visible)
    .Zi--Star,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button[aria-label="已收藏"]
    .Zi--Star,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button[aria-label="收藏"]:is(:hover, :focus-visible)
    .Zi--Star,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button[aria-label="已收藏"]
    .Zi--Star {
    color: var(--zb-warning) !important;
    fill: currentColor !important;
  }

  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:is(
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    ):has(
      :is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)
    )
    svg,
  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button:is(
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    ):has(
      :is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)
    )
    svg {
    color: var(--zb-danger) !important;
    fill: currentColor !important;
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

  html[data-zb-theme] .PinItem .PinToolbar-actions {
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text-muted) !important;
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

  html[data-zb-theme] [data-zb-home-sidebar] :where(div, span),
  html[data-zb-theme]
    [data-za-detail-view-path-module="RightSideBar"]
    .Card
    :where(div, span) {
    color: inherit !important;
  }

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
    background-color: var(--zb-surface) !important;
    border-color: var(--zb-border) !important;
    color: var(--zb-text) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    :is(.Card, .HotSearchCard) {
    box-sizing: border-box !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:is(
      :focus-visible,
      :has(> :is(a, button):focus-visible)
    ) {
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
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
      .Topstory-container > .Topstory-mainColumn + *
    )
    .HotSearchCard-tag {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: 24px !important;
    padding: 0 5px !important;
    white-space: nowrap !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:has(.FollowButton)
    > div:has(> div > div > .FollowButton) {
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
    .Card:has(.FollowButton)
    > div:has(> div > div > .FollowButton)
    > div:has(.FollowButton) {
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
    ):is(:hover, :focus-visible) {
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;
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
    ):focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
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
    color: inherit !important;
    fill: currentColor !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:has(.FollowButton)
    div:has(> .AuthorInfo + .FollowButton) {
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
    .Card:has(.FollowButton)
    div:has(> .AuthorInfo + .FollowButton)
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
    .Card:has(.FollowButton)
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
    .Card:has(.FollowButton)
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
    .Card:has(.FollowButton)
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
    .Card:has(.FollowButton)
    .FollowButton.Button--blue {
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:has(.FollowButton)
    .FollowButton.Button--blue:hover {
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:has(.FollowButton)
    .FollowButton.Button--grey {
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:has(.FollowButton)
    .FollowButton.Button--grey:is(:hover, :focus-visible) {
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:has(.FollowButton)
    .FollowButton.Button--blue:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:has(.FollowButton)
    .FollowButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
    outline: 0 !important;
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      [data-za-detail-view-path-module="RightSideBar"]
    )
    .Card:has(.FollowButton)
    .FollowButton
    svg {
    color: inherit !important;
    fill: currentColor !important;
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
    overflow-y: auto !important;
    scrollbar-color: var(--zb-text-subtle) transparent !important;
    scrollbar-width: thin !important;
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
    background-color: var(--zb-surface-raised) !important;
    border: 1px solid var(--zb-border-strong) !important;
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
    color: var(--zb-text) !important;
    -webkit-text-fill-color: var(--zb-text) !important;
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
    > :where(a, div):hover {
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;
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

  html[data-zb-theme]
    div:has(
      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]
    ) {
    background-color: var(--zb-surface) !important;
    border: 1px solid var(--zb-border) !important;
    border-radius: 12px !important;
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

  html[data-zb-theme] .QuestionPage .PlaceHolder,
  html[data-zb-theme] .QuestionPage .PlaceHolder-inner {
    background-color: var(--zb-surface) !important;
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder {
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder-bg {
    background: linear-gradient(
      to right,
      var(--zb-surface-raised) 0%,
      var(--zb-surface-hover) 20%,
      var(--zb-surface-raised) 40%,
      var(--zb-surface-raised) 100%
    ) !important;
  }

  html[data-zb-theme] .QuestionPage .PlaceHolder-mask,
  html[data-zb-theme] .QuestionPage .PlaceHolder-mask path {
    color: var(--zb-surface) !important;
    fill: currentColor !important;
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
