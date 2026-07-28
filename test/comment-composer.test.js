import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { createCommentComposerFeature } from "../src/features/comment-composer.js";

const activePages = [];

const createPage = () => {
  const page = new JSDOM("<!doctype html><html><body></body></html>", {
    pretendToBeVisual: true,
    url: "https://www.zhihu.com/question/1",
  });
  activePages.push(page);
  return page;
};

const createCommentModal = (document) => {
  const modal = document.createElement("div");
  modal.className = "Modal-content";
  modal.innerHTML = `
    <div>
      <div></div>
      <div></div>
      <div>
        <img class="Avatar" alt="">
        <div>
          <div>
            <div>
              <div class="InputLike Editable">
                <div contenteditable="true" tabindex="0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return modal;
};

const createInlineCommentComposer = (document) => {
  const comments = document.createElement("div");
  comments.className = "Comments-container";
  comments.innerHTML = `
    <div>
      <div>
        <div>
          <div class="InputLike Editable">
            <div contenteditable="true" tabindex="0"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  return comments;
};

const flushMutations = async () => {
  await new Promise((resolve) => globalThis.setTimeout(resolve, 50));
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("comment composer feature", () => {
  it("collapses only the initial autofocus and keeps later user focus", async () => {
    const page = createPage();
    const feature = createCommentComposerFeature(page.window);
    feature.start();

    const modal = createCommentModal(page.window.document);
    page.window.document.body.append(modal);
    const editor = modal.querySelector('[contenteditable="true"]');
    editor.focus();
    await flushMutations();

    expect(page.window.document.activeElement).not.toBe(editor);
    expect(modal.querySelector("[data-zb-comment-composer-collapsed]")).not.toBeNull();

    editor.dispatchEvent(new page.window.MouseEvent("pointerdown", { bubbles: true }));
    editor.focus();
    modal.append(page.window.document.createElement("span"));
    await flushMutations();

    expect(page.window.document.activeElement).toBe(editor);
    expect(modal.querySelector("[data-zb-comment-composer-collapsed]")).toBeNull();
    feature.destroy();
  });

  it("does not blur an editor that already contains a reply", async () => {
    const page = createPage();
    const feature = createCommentComposerFeature(page.window);
    feature.start();

    const modal = createCommentModal(page.window.document);
    const editor = modal.querySelector('[contenteditable="true"]');
    editor.textContent = "draft";
    page.window.document.body.append(modal);
    editor.focus();
    await flushMutations();

    expect(page.window.document.activeElement).toBe(editor);
    feature.destroy();
  });

  it("preserves focus when the user clicks the composer during opening", async () => {
    const page = createPage();
    const feature = createCommentComposerFeature(page.window);
    feature.start();

    const modal = createCommentModal(page.window.document);
    page.window.document.body.append(modal);
    const editor = modal.querySelector('[contenteditable="true"]');
    editor.focus();
    editor.dispatchEvent(new page.window.MouseEvent("pointerdown", { bubbles: true }));
    await flushMutations();

    expect(page.window.document.activeElement).toBe(editor);
    feature.destroy();
  });

  it("focuses an inline footer composer with the first complete pointer gesture", async () => {
    const page = createPage();
    const feature = createCommentComposerFeature(page.window);
    feature.start();

    const comments = createInlineCommentComposer(page.window.document);
    page.window.document.body.append(comments);
    const editor = comments.querySelector('[contenteditable="true"]');
    const editable = comments.querySelector(".InputLike.Editable");
    const pointerDown = new page.window.MouseEvent("pointerdown", {
      bubbles: true,
      cancelable: true,
    });

    editable.dispatchEvent(pointerDown);
    expect(pointerDown.defaultPrevented).toBe(true);
    editable.dispatchEvent(new page.window.MouseEvent("pointerup", { bubbles: true }));
    await flushMutations();

    expect(page.window.document.activeElement).toBe(editor);
    feature.destroy();
  });

  it("cancels pending inline focus when destroyed", async () => {
    const page = createPage();
    const feature = createCommentComposerFeature(page.window);
    feature.start();
    const comments = createInlineCommentComposer(page.window.document);
    page.window.document.body.append(comments);
    const editor = comments.querySelector('[contenteditable="true"]');
    const editable = comments.querySelector(".InputLike.Editable");

    editable.dispatchEvent(
      new page.window.MouseEvent("pointerdown", { bubbles: true, cancelable: true }),
    );
    editable.dispatchEvent(new page.window.MouseEvent("pointerup", { bubbles: true }));
    feature.destroy();
    await flushMutations();

    expect(page.window.document.activeElement).not.toBe(editor);
  });

  it("does not rescan the document for unrelated DOM mutations", async () => {
    const page = createPage();
    const feature = createCommentComposerFeature(page.window);
    feature.start();
    const queryAll = vi.spyOn(page.window.document, "querySelectorAll");

    page.window.document.body.append(page.window.document.createElement("section"));
    await flushMutations();

    expect(queryAll).not.toHaveBeenCalled();
    feature.destroy();
  });

  it("does not create a MutationObserver", () => {
    const page = createPage();
    page.window.MutationObserver = class {
      constructor() {
        throw new Error("comment feature should be event-driven");
      }
    };
    const feature = createCommentComposerFeature(page.window);

    expect(() => feature.start()).not.toThrow();
    feature.destroy();
  });
});
