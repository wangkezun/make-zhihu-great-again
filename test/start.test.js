import { JSDOM } from "jsdom";
import { describe, expect, it, vi } from "vitest";

import { startWhenDocumentElementReady } from "../src/start.js";

describe("early userscript start", () => {
  it("starts immediately when the document element already exists", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>");
    const start = vi.fn();

    startWhenDocumentElementReady(page.window, start);

    expect(start).toHaveBeenCalledOnce();
    page.window.close();
  });

  it("starts as soon as the document element appears", async () => {
    const page = new JSDOM("");
    page.window.document.documentElement.remove();
    const start = vi.fn();

    startWhenDocumentElementReady(page.window, start);
    expect(start).not.toHaveBeenCalled();

    const html = page.window.document.createElement("html");
    page.window.document.append(html);
    await new Promise((resolve) => page.window.queueMicrotask(resolve));

    expect(start).toHaveBeenCalledOnce();
    page.window.close();
  });
});
