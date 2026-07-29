import { PRIMARY_BUTTON_HOVER_STYLE, PRIMARY_BUTTON_STYLE } from "../shared/actions.js";
import { CURRENT_COLOR_ICON_STYLE } from "../shared/content.js";

export const PRIMARY_BUTTON_COMPONENT_STYLE = `  html[data-zb-theme] .Button--blue {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme] .Button--blue:hover {${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme] :is(.Button, button) :where(svg, path) {
    ${CURRENT_COLOR_ICON_STYLE}
  }

`;

export const CORNER_BUTTON_COMPONENT_STYLE = `  html[data-zb-theme] .CornerButton {
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
    ${CURRENT_COLOR_ICON_STYLE}
  }

`;

export const VOTE_BUTTON_COMPONENT_STYLE = `  html[data-zb-theme] .VoteButton {
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

`;
