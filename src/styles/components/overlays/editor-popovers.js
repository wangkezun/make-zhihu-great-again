import {
  RAISED_STRONG_CONTROL_SURFACE_STYLE,
  RAISED_TEXT_STYLE,
  SURFACE_TEXT_ONLY_STYLE,
  SURFACE_TEXT_STYLE,
  TRANSPARENT_TEXT_STYLE,
} from "../../shared/surfaces.js";

export const EDITOR_POPOVERS_OVERLAY_STYLE = `  html[data-zb-theme] .Editable-languageSuggestions,
  html[data-zb-theme] .Editable-languageSuggestions .Popover-content,
  html[data-zb-theme] .Editable-languageSuggestionsMenu,
  html[data-zb-theme] .TopicSuggestion-Popover,
  html[data-zb-theme] .TopicSuggestion-Popover-container {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .Editable-languageSuggestions .Menu-item,
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item {${SURFACE_TEXT_ONLY_STYLE}
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem,
  html[data-zb-theme] .TopicSuggestion-TopicItem .topic-name {${TRANSPARENT_TEXT_STYLE}
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .pin-count {
    color: var(--zb-text-muted) !important;
  }

  html[data-zb-theme] .TopicSuggestion-TopicItem .new-topic {
    color: var(--zb-primary) !important;
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer,
  html[data-zb-theme] .MentionSuggestions-menu {
    ${SURFACE_TEXT_STYLE}
  }

  html[data-zb-theme] .TopicInputAlias-suggestionContainer .Menu-item,
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item {${TRANSPARENT_TEXT_STYLE}
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
  html[data-zb-theme] .MentionSuggestions-menu .Menu-item.is-active {${RAISED_TEXT_STYLE}
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
  html[data-zb-theme] .TopicSuggestion-Popover .Menu-item.is-active {${RAISED_TEXT_STYLE}
  }

  html[data-zb-theme] .EmoticonPopover {
    ${RAISED_STRONG_CONTROL_SURFACE_STYLE}
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

`;
