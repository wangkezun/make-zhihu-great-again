import { describe, expect, it } from "vitest";

import { RING_PAGE_STYLE } from "../src/styles/pages/ring.js";
import { RING_FEEDS_STYLE } from "../src/styles/pages/ring/feeds.js";
import { RING_FOUNDATION_STYLE } from "../src/styles/pages/ring/foundation.js";
import { RING_HOST_STYLE } from "../src/styles/pages/ring/host.js";
import { RING_HOST_FEED_STYLE } from "../src/styles/pages/ring/host/feed.js";
import { RING_HOST_HEADER_STYLE } from "../src/styles/pages/ring/host/header.js";
import { RING_HOST_INVITE_MODAL_STYLE } from "../src/styles/pages/ring/host/invite-modal.js";
import { RING_HOST_PIN_TOOLBAR_STYLE } from "../src/styles/pages/ring/host/pin-toolbar.js";
import { RING_HOST_SIDEBAR_STYLE } from "../src/styles/pages/ring/host/sidebar.js";
import { RING_INDEX_STYLE } from "../src/styles/pages/ring/index.js";

const ringSections = [RING_FOUNDATION_STYLE, RING_INDEX_STYLE, RING_HOST_STYLE, RING_FEEDS_STYLE];
const ringHostSections = [
  RING_HOST_HEADER_STYLE,
  RING_HOST_FEED_STYLE,
  RING_HOST_SIDEBAR_STYLE,
  RING_HOST_PIN_TOOLBAR_STYLE,
  RING_HOST_INVITE_MODAL_STYLE,
];

describe("ring style composition", () => {
  it.each(ringSections)("includes each ring section once", (styleText) => {
    expect(RING_PAGE_STYLE.split(styleText)).toHaveLength(2);
  });

  it("preserves the ring cascade order", () => {
    const sectionOrder = ringSections.map((styleText) => RING_PAGE_STYLE.indexOf(styleText));

    expect(sectionOrder.every((index) => index >= 0)).toBe(true);
    expect(sectionOrder).toEqual([...sectionOrder].sort((left, right) => left - right));
  });

  it.each(ringHostSections)("includes each ring host section once", (styleText) => {
    expect(RING_HOST_STYLE.split(styleText)).toHaveLength(2);
  });

  it("preserves the ring host cascade order", () => {
    const sectionOrder = ringHostSections.map((styleText) => RING_HOST_STYLE.indexOf(styleText));

    expect(sectionOrder.every((index) => index >= 0)).toBe(true);
    expect(sectionOrder).toEqual([...sectionOrder].sort((left, right) => left - right));
  });
});
