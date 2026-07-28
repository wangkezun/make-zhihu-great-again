import { JSDOM } from "jsdom";
import { describe, expect, it, vi } from "vitest";

import {
  clearMenuCommands,
  ensureStyle,
  persistBooleanPreference,
  persistMode,
  readBooleanPreference,
  readStoredMode,
} from "../src/features/shared.js";

describe("shared feature helpers", () => {
  it("injects each style once", () => {
    const page = new JSDOM("<!doctype html><html><head></head><body></body></html>");

    ensureStyle(page.window.document, "feature-style", "body { color: red; }");
    ensureStyle(page.window.document, "feature-style", "body { color: blue; }");

    const styles = page.window.document.querySelectorAll("#feature-style");
    expect(styles).toHaveLength(1);
    expect(styles[0].textContent).toBe("body { color: red; }");
    page.window.close();
  });

  it("reads and persists boolean preferences through settings or local storage", () => {
    const page = new JSDOM("<!doctype html>", { url: "https://www.zhihu.com/" });
    const settings = {
      getPreference: () => false,
      setPreference: vi.fn(),
    };

    expect(readBooleanPreference(page.window, settings, "preference")).toBe(false);
    persistBooleanPreference(page.window, settings, "preference", true);
    expect(settings.setPreference).toHaveBeenCalledWith(true);

    persistBooleanPreference(page.window, undefined, "preference", false);
    expect(readBooleanPreference(page.window, undefined, "preference")).toBe(false);
    page.window.close();
  });

  it("falls back for invalid boolean preference values", () => {
    const page = new JSDOM("<!doctype html>", { url: "https://www.zhihu.com/" });

    expect(
      readBooleanPreference(page.window, { getPreference: () => "false" }, "preference", true),
    ).toBe(true);
    page.window.localStorage.setItem("preference", "invalid");
    expect(readBooleanPreference(page.window, undefined, "preference", false)).toBe(false);
    page.window.close();
  });

  it("validates modes, persists selections, and clears registered commands", () => {
    const settings = {
      getMode: () => "wide",
      setMode: vi.fn(),
    };
    const unregister = vi.fn();
    const commandIds = [1, 2];

    expect(readStoredMode(settings, (mode) => mode === "wide", "standard")).toBe("wide");
    expect(readStoredMode({ getMode: () => "invalid" }, () => false, "standard")).toBe("standard");
    persistMode(settings, "wide");
    clearMenuCommands({ unregister }, commandIds);

    expect(settings.setMode).toHaveBeenCalledWith("wide");
    expect(unregister.mock.calls).toEqual([[1], [2]]);
    expect(commandIds).toEqual([]);
  });

  it("keeps page state usable when storage adapters throw", () => {
    const brokenSettings = {
      getMode: () => {
        throw new Error("unavailable");
      },
      getPreference: () => {
        throw new Error("unavailable");
      },
      setMode: () => {
        throw new Error("unavailable");
      },
      setPreference: () => {
        throw new Error("unavailable");
      },
    };
    const page = new JSDOM("<!doctype html>", { url: "https://www.zhihu.com/" });

    expect(readStoredMode(brokenSettings, () => true, "system")).toBe("system");
    expect(readBooleanPreference(page.window, brokenSettings, "preference")).toBe(true);
    expect(() => persistMode(brokenSettings, "mocha")).not.toThrow();
    expect(() =>
      persistBooleanPreference(page.window, brokenSettings, "preference", false),
    ).not.toThrow();
    page.window.close();
  });
});
