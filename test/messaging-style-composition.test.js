import { describe, expect, it } from "vitest";

import { MESSAGING_COMPONENT_STYLE } from "../src/styles/components/messaging.js";
import { CHAT_MODAL_STYLE } from "../src/styles/components/messaging/chat-modal.js";
import { CHAT_PAGE_CONVERSATION_STYLE } from "../src/styles/components/messaging/chat-page-conversation.js";
import { CHAT_PAGE_SIDEBAR_STYLE } from "../src/styles/components/messaging/chat-page-sidebar.js";
import { HEADER_MESSAGING_POPOVERS_STYLE } from "../src/styles/components/messaging/header-popovers.js";

const messagingSections = [
  HEADER_MESSAGING_POPOVERS_STYLE,
  CHAT_PAGE_SIDEBAR_STYLE,
  CHAT_PAGE_CONVERSATION_STYLE,
  CHAT_MODAL_STYLE,
];

describe("messaging style composition", () => {
  it.each(messagingSections)("includes each messaging section once", (styleText) => {
    expect(MESSAGING_COMPONENT_STYLE.split(styleText)).toHaveLength(2);
  });

  it("preserves the messaging cascade order", () => {
    const sectionOrder = messagingSections.map((styleText) =>
      MESSAGING_COMPONENT_STYLE.indexOf(styleText),
    );

    expect(sectionOrder.every((index) => index >= 0)).toBe(true);
    expect(sectionOrder).toEqual([...sectionOrder].sort((left, right) => left - right));
  });
});
