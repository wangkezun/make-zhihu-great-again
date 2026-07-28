import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PAGE_CONTEXT_CHANGE_EVENT } from "../src/features/page-context.js";
import { createPageStylesFeature } from "../src/features/page-styles.js";

const activePages = [];

const createPage = (url = "https://www.zhihu.com/question/123") => {
  const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", { url });
  activePages.push(page);
  return page;
};

const dispatchPageContext = (page, detail) => {
  page.window.dispatchEvent(
    new page.window.CustomEvent(PAGE_CONTEXT_CHANGE_EVENT, {
      detail,
    }),
  );
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("page styles feature", () => {
  it("loads matching page-key and predicate styles synchronously", () => {
    const page = createPage();
    const predicate = vi.fn((context) => context.question);
    const feature = createPageStylesFeature(page.window, [
      {
        pageKeys: ["question", "topic"],
        styleId: "zb-content-page-style",
        styleText: ".ContentItem { color: red; }",
      },
      {
        matches: predicate,
        styleId: "zb-question-controls-style",
        styleText: ".QuestionButtonGroup { color: blue; }",
      },
      {
        pageKeys: "home",
        styleId: "zb-home-page-style",
        styleText: ".Topstory { color: green; }",
      },
    ]);

    feature.start();

    expect(page.window.document.getElementById("zb-content-page-style")?.textContent).toBe(
      ".ContentItem { color: red; }",
    );
    expect(page.window.document.getElementById("zb-question-controls-style")).not.toBeNull();
    expect(page.window.document.getElementById("zb-home-page-style")).toBeNull();
    expect(predicate).toHaveBeenCalledWith(expect.objectContaining({ question: true }));
  });

  it("adds and removes only the affected styles after page context changes", () => {
    const page = createPage();
    const feature = createPageStylesFeature(page.window, [
      {
        pageKeys: "question",
        styleId: "zb-question-page-style",
        styleText: ".QuestionPage {}",
      },
      {
        pageKeys: "topic",
        styleId: "zb-topic-page-style",
        styleText: ".TopicPage {}",
      },
    ]);
    feature.start();
    const questionStyle = page.window.document.getElementById("zb-question-page-style");

    dispatchPageContext(page, { question: false, topic: true });

    expect(questionStyle?.isConnected).toBe(false);
    expect(page.window.document.getElementById("zb-question-page-style")).toBeNull();
    expect(page.window.document.getElementById("zb-topic-page-style")?.textContent).toBe(
      ".TopicPage {}",
    );
  });

  it("starts idempotently and cleans up its listener and owned styles", () => {
    const page = createPage();
    const addEventListener = vi.spyOn(page.window, "addEventListener");
    const removeEventListener = vi.spyOn(page.window, "removeEventListener");
    const feature = createPageStylesFeature(page.window, [
      {
        pageKeys: "question",
        styleId: "zb-question-page-style",
        styleText: ".QuestionPage {}",
      },
    ]);

    feature.start();
    feature.start();

    expect(
      addEventListener.mock.calls.filter(([eventName]) => eventName === PAGE_CONTEXT_CHANGE_EVENT),
    ).toHaveLength(1);
    expect(page.window.document.querySelectorAll("#zb-question-page-style")).toHaveLength(1);

    feature.destroy();
    dispatchPageContext(page, { question: true });

    expect(page.window.document.getElementById("zb-question-page-style")).toBeNull();
    expect(
      removeEventListener.mock.calls.filter(
        ([eventName]) => eventName === PAGE_CONTEXT_CHANGE_EVENT,
      ),
    ).toHaveLength(1);

    feature.start();
    expect(page.window.document.querySelectorAll("#zb-question-page-style")).toHaveLength(1);
    feature.destroy();
  });

  it("does not remove a colliding style element it did not create", () => {
    const page = createPage();
    const externalStyle = page.window.document.createElement("style");
    externalStyle.id = "zb-question-page-style";
    externalStyle.textContent = ".External {}";
    page.window.document.head.append(externalStyle);
    const feature = createPageStylesFeature(page.window, [
      {
        pageKeys: "question",
        styleId: "zb-question-page-style",
        styleText: ".QuestionPage {}",
      },
    ]);

    feature.start();
    dispatchPageContext(page, { question: false });
    feature.destroy();

    expect(page.window.document.getElementById("zb-question-page-style")).toBe(externalStyle);
    expect(externalStyle.textContent).toBe(".External {}");
  });

  it("rejects duplicate style ids", () => {
    const page = createPage();

    expect(() =>
      createPageStylesFeature(page.window, [
        { pageKeys: "question", styleId: "zb-page-style", styleText: ".QuestionPage {}" },
        { pageKeys: "topic", styleId: "zb-page-style", styleText: ".TopicPage {}" },
      ]),
    ).toThrow("Duplicate page style id: zb-page-style");
  });

  it("rejects unknown page keys", () => {
    const page = createPage();

    expect(() =>
      createPageStylesFeature(page.window, [
        { pageKeys: "quesiton", styleId: "zb-page-style", styleText: ".QuestionPage {}" },
      ]),
    ).toThrow('Page style "zb-page-style" has invalid pageKeys.');
  });
});
