import { describe, expect, it } from "vitest";

import { MESSAGING_COMPONENT_STYLE } from "../src/styles/components/messaging.js";
import { OVERLAYS_COMPONENT_STYLE } from "../src/styles/components/overlays.js";
import { ARROW_ACTION_PANEL_OVERLAY_STYLE } from "../src/styles/components/overlays/arrow-action-panel.js";
import { CONFIRMATION_DIALOG_OVERLAY_STYLE } from "../src/styles/components/overlays/confirmation-dialog.js";
import { EDITOR_POPOVERS_OVERLAY_STYLE } from "../src/styles/components/overlays/editor-popovers.js";
import { FAVORITES_MODAL_OVERLAY_STYLE } from "../src/styles/components/overlays/favorites-modal.js";
import { GIFT_MODAL_OVERLAY_STYLE } from "../src/styles/components/overlays/gift-modal.js";
import { MATERIAL_LIBRARY_MODAL_OVERLAY_STYLE } from "../src/styles/components/overlays/material-library-modal.js";
import { MEDIA_MODALS_OVERLAY_STYLE } from "../src/styles/components/overlays/media-modals.js";
import { POLL_OVERLAYS_STYLE } from "../src/styles/components/overlays/poll.js";
import { REFERENCE_MODAL_OVERLAY_STYLE } from "../src/styles/components/overlays/reference-modal.js";
import { RESPONSIVE_MODAL_OVERLAY_STYLE } from "../src/styles/components/overlays/responsive-modal.js";
import { VOTER_LIST_OVERLAY_STYLE } from "../src/styles/components/overlays/voter-list.js";

const overlaySections = [
  VOTER_LIST_OVERLAY_STYLE,
  GIFT_MODAL_OVERLAY_STYLE,
  FAVORITES_MODAL_OVERLAY_STYLE,
  ARROW_ACTION_PANEL_OVERLAY_STYLE,
  MESSAGING_COMPONENT_STYLE,
  EDITOR_POPOVERS_OVERLAY_STYLE,
  MATERIAL_LIBRARY_MODAL_OVERLAY_STYLE,
  REFERENCE_MODAL_OVERLAY_STYLE,
  CONFIRMATION_DIALOG_OVERLAY_STYLE,
  RESPONSIVE_MODAL_OVERLAY_STYLE,
  MEDIA_MODALS_OVERLAY_STYLE,
  POLL_OVERLAYS_STYLE,
];

describe("overlay style composition", () => {
  it.each(overlaySections)("includes each extracted overlay section once", (styleText) => {
    expect(OVERLAYS_COMPONENT_STYLE.split(styleText)).toHaveLength(2);
  });

  it("preserves the overlay cascade order", () => {
    const sectionOrder = overlaySections.map((styleText) =>
      OVERLAYS_COMPONENT_STYLE.indexOf(styleText),
    );

    expect(sectionOrder.every((index) => index >= 0)).toBe(true);
    expect(sectionOrder).toEqual([...sectionOrder].sort((left, right) => left - right));
  });
});
