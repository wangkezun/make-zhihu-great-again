import { RAISED_CONTROL_SURFACE_STYLE } from "./surfaces.js";

export const COMPACT_ACTION_BUTTON_STYLE = `
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    border-radius: 6px !important;`;

export const COMPACT_ACTION_MUTED_STYLE = `
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 4px 6px !important;
    background-color: transparent !important;
    border: 0 !important;
    border-radius: 6px !important;
    color: var(--zb-text-muted) !important;
    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;`;

export const COMPACT_ACTION_HOVER_STYLE = `
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-text) !important;`;

export const COMPACT_ACTION_FOCUS_STYLE = `
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;`;

export const CONTENT_MORE_STYLE = `
    box-sizing: border-box !important;
    min-height: 28px !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    color: var(--zb-primary) !important;
    font-size: 14px !important;
    line-height: 22px !important;`;

export const SOFT_PRIMARY_STATE_STYLE = `
    background-color: var(--zb-primary-soft) !important;
    color: var(--zb-primary) !important;`;

export const CONTENT_MORE_ACTIVE_STYLE = SOFT_PRIMARY_STATE_STYLE;

export const PRIMARY_FOCUS_STYLE = `
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;
    outline: 0 !important;`;

export const PRIMARY_BUTTON_STYLE = `
    background-color: var(--zb-primary) !important;
    border-color: var(--zb-primary) !important;
    color: var(--ctp-crust) !important;`;

export const PRIMARY_BUTTON_HOVER_STYLE = `
    background-color: var(--zb-primary-hover) !important;
    border-color: var(--zb-primary-hover) !important;`;

export const RAISED_MUTED_CONTROL_STYLE = `
    background-color: var(--zb-surface-raised) !important;
    border-color: var(--zb-border-strong) !important;
    color: var(--zb-text-muted) !important;`;

export const DANGER_CONTROL_STYLE = `
    background-color: var(--zb-danger-soft) !important;
    border-color: var(--zb-danger) !important;
    color: var(--zb-danger) !important;`;

export const FOLLOWING_BUTTON_STYLE = RAISED_MUTED_CONTROL_STYLE;

export const FOLLOWING_BUTTON_DANGER_STYLE = DANGER_CONTROL_STYLE;

export const OUTLINED_PRIMARY_BUTTON_STYLE = `
    background-color: transparent !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;`;

export const OUTLINED_PRIMARY_BUTTON_HOVER_STYLE = `
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary-hover) !important;
    color: var(--zb-primary-hover) !important;`;

export const RAISED_ACTION_CONTROL_STYLE = `
    box-sizing: border-box !important;
    ${RAISED_CONTROL_SURFACE_STYLE}
    color: var(--zb-text-muted) !important;
    box-shadow: none !important;
    outline: 0 !important;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease !important;`;

export const SOFT_PRIMARY_ACTION_STYLE = `
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;`;

export const SOFT_PRIMARY_FOCUS_ACTION_STYLE = `
    background-color: var(--zb-primary-soft) !important;
    border-color: var(--zb-primary) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;`;

export const PRIMARY_BORDER_FOCUS_STYLE = `
    border-color: var(--zb-primary) !important;
    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;`;

export const RAISED_PRIMARY_HOVER_STYLE = `
    background-color: var(--zb-surface-raised) !important;
    color: var(--zb-primary) !important;
    outline: 0 !important;`;
