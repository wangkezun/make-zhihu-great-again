import { flavors } from "@catppuccin/palette";
import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { createThemeFeature, THEME_MODES } from "../src/features/theme.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";
import { CRITICAL_THEME_STYLE } from "../src/styles/critical-theme.js";

const activePages = [];

const createPage = () => {
  const page = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
    url: "https://www.zhihu.com/",
  });
  activePages.push(page);
  return page;
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("Catppuccin theme feature", () => {
  it("defaults to following the system and registers every theme option", () => {
    const page = createPage();
    const commands = new Map();
    let nextCommandId = 1;
    const feature = createThemeFeature(page.window, {
      getMode: (defaultValue) => defaultValue,
      menu: {
        register: (label, callback) => {
          const commandId = nextCommandId++;
          commands.set(commandId, { callback, label });
          return commandId;
        },
        unregister: (commandId) => commands.delete(commandId),
      },
    });

    feature.start();

    expect(page.window.document.documentElement.dataset.zbTheme).toBe("system");
    expect(page.window.document.getElementById("zb-critical-theme-style")).not.toBeNull();
    expect(page.window.document.getElementById("zb-catppuccin-theme-style")).not.toBeNull();
    expect(commands.size).toBe(THEME_MODES.length);
    expect([...commands.values()].map(({ label }) => label)).toContain(
      "✓ 主题：跟随系统（Latte / Mocha）",
    );

    feature.destroy();
    expect(commands.size).toBe(0);
    expect(page.window.document.getElementById("zb-critical-theme-style")).toBeNull();
    expect(page.window.document.getElementById("zb-catppuccin-theme-style")).toBeNull();
  });

  it("applies and persists a manually selected flavor", () => {
    const page = createPage();
    let savedMode;
    const feature = createThemeFeature(page.window, {
      getMode: () => "system",
      setMode: (selectedMode) => {
        savedMode = selectedMode;
      },
    });

    feature.start();
    feature.setMode("macchiato");

    expect(page.window.document.documentElement.dataset.zbTheme).toBe("macchiato");
    expect(savedMode).toBe("macchiato");
    feature.destroy();
  });

  it("falls back to system mode for an invalid stored value", () => {
    const page = createPage();
    const feature = createThemeFeature(page.window, { getMode: () => "unknown" });

    feature.start();

    expect(page.window.document.documentElement.dataset.zbTheme).toBe("system");
    feature.destroy();
  });

  it("marks arrow action panels incrementally instead of styling them with broad :has selectors", async () => {
    const page = createPage();
    const feature = createThemeFeature(page.window);
    feature.start();
    const wrapper = page.window.document.createElement("div");
    wrapper.innerHTML = `
      <div>
        <div><span>操作</span></div>
        <div></div>
        <div><button><svg class="ZDI--ArrowRight24"></svg></button></div>
      </div>
    `;

    page.window.document.body.append(wrapper);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));

    expect(wrapper.hasAttribute("data-zb-arrow-action-panel-wrapper")).toBe(true);
    expect(wrapper.firstElementChild.hasAttribute("data-zb-arrow-action-panel")).toBe(true);
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("div:has(> div:first-child > span:only-child)");
    feature.destroy();
  });

  it("marks dynamically loaded hover-card structure and refreshes its single-action state", async () => {
    const page = createPage();
    const feature = createThemeFeature(page.window);
    feature.start();
    const hoverCard = page.window.document.createElement("div");
    hoverCard.innerHTML = `
      <div class="HoverCard-item">
        <div class="avatar-row"><img class="Avatar"></div>
        <div class="HoverCard-buttons"><button class="Button"></button></div>
      </div>
    `;

    page.window.document.body.append(hoverCard);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));

    const avatarRow = hoverCard.querySelector(".avatar-row");
    const actionRow = hoverCard.querySelector(".HoverCard-buttons");
    expect(hoverCard.hasAttribute("data-zb-hover-card")).toBe(true);
    expect(avatarRow.hasAttribute("data-zb-hover-card-avatar-row")).toBe(true);
    expect(actionRow.hasAttribute("data-zb-hover-card-single-action")).toBe(true);

    actionRow.append(page.window.document.createElement("button"));
    actionRow.lastElementChild.className = "Button";
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(actionRow.hasAttribute("data-zb-hover-card-single-action")).toBe(false);

    actionRow.lastElementChild.remove();
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(actionRow.hasAttribute("data-zb-hover-card-single-action")).toBe(true);

    feature.destroy();
    expect(hoverCard.hasAttribute("data-zb-hover-card")).toBe(false);
    expect(avatarRow.hasAttribute("data-zb-hover-card-avatar-row")).toBe(false);
    expect(actionRow.hasAttribute("data-zb-hover-card-single-action")).toBe(false);
  });

  it("marks comment modals and keeps the marker while sorted content is temporarily unmounted", async () => {
    const page = createPage();
    const feature = createThemeFeature(page.window);
    feature.start();
    const commentModal = page.window.document.createElement("div");
    commentModal.className = "Modal-content";
    commentModal.innerHTML = '<div class="CommentContent">评论</div>';

    page.window.document.body.append(commentModal);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(commentModal.hasAttribute("data-zb-comment-modal")).toBe(true);

    commentModal.querySelector(".CommentContent").remove();
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(commentModal.hasAttribute("data-zb-comment-modal")).toBe(true);

    const fallbackModal = page.window.document.createElement("div");
    fallbackModal.className = "Modal-content";
    fallbackModal.innerHTML = '<div class="InputLike Editable"></div><img class="Avatar">';
    page.window.document.body.append(fallbackModal);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(fallbackModal.hasAttribute("data-zb-comment-modal")).toBe(true);

    feature.destroy();
    expect(commentModal.hasAttribute("data-zb-comment-modal")).toBe(false);
    expect(fallbackModal.hasAttribute("data-zb-comment-modal")).toBe(false);
  });

  it("marks action-menu popovers without a relational selector", async () => {
    const page = createPage();
    const feature = createThemeFeature(page.window);
    feature.start();
    const popover = page.window.document.createElement("div");
    popover.className = "Popover-content";
    popover.innerHTML = '<div class="ActionMenu"></div>';

    page.window.document.body.append(popover);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(popover.hasAttribute("data-zb-action-menu-popover")).toBe(true);

    feature.destroy();
    expect(popover.hasAttribute("data-zb-action-menu-popover")).toBe(false);
  });

  it("tracks the chat modal on body without a root-level relational selector", async () => {
    const page = createPage();
    const feature = createThemeFeature(page.window);
    feature.start();
    const chatModal = page.window.document.createElement("div");
    chatModal.className = "ChatBoxModal";

    page.window.document.body.append(chatModal);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(page.window.document.body.dataset.zbChatModalOpen).toBe("true");

    chatModal.remove();
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(page.window.document.body.dataset.zbChatModalOpen).toBe("false");

    feature.destroy();
    expect(page.window.document.body.hasAttribute("data-zb-chat-modal-open")).toBe(false);
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("body:has(.ChatBoxModal)");
    expect(CATPPUCCIN_THEME_STYLE).toContain('body[data-zb-chat-modal-open="true"]');
  });

  it("marks poll option popovers only while a poll or PK modal is open", async () => {
    const page = createPage();
    const feature = createThemeFeature(page.window);
    feature.start();
    const modal = page.window.document.createElement("div");
    modal.className = "Modal";
    modal.innerHTML = '<input placeholder="请输入投票 标题">';
    const popover = page.window.document.createElement("div");
    const options = Array.from({ length: 8 }, (_, index) => `<div>${index}</div>`).join("");
    popover.innerHTML = `<svg></svg><div>${options}</div>`;

    page.window.document.body.append(modal, popover);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));

    expect(page.window.document.documentElement.dataset.zbPollModalOpen).toBe("true");
    expect(popover.hasAttribute("data-zb-poll-option-popover")).toBe(true);

    modal.remove();
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
    expect(page.window.document.documentElement.dataset.zbPollModalOpen).toBe("false");

    feature.destroy();
    expect(page.window.document.documentElement.hasAttribute("data-zb-poll-modal-open")).toBe(
      false,
    );
    expect(popover.hasAttribute("data-zb-poll-option-popover")).toBe(false);
  });

  it("does not inspect mutations inside the main application root", async () => {
    const page = createPage();
    const root = page.window.document.createElement("div");
    root.id = "root";
    page.window.document.body.append(root);
    const feature = createThemeFeature(page.window);
    feature.start();
    const queryAll = vi.spyOn(page.window.Element.prototype, "querySelectorAll");

    root.append(page.window.document.createElement("article"));
    await new Promise((resolve) => globalThis.setTimeout(resolve, 0));

    expect(queryAll).not.toHaveBeenCalled();
    feature.destroy();
  });

  it("adds full-title tooltips to dynamically loaded related-question links", () => {
    const page = createPage();
    const feature = createThemeFeature(page.window);
    feature.start();
    const item = page.window.document.createElement("div");
    item.className = "SimilarQuestions-item";
    item.innerHTML =
      '<a href="/question/123">这是一个在侧栏中会被截断的完整相关问题标题</a> 12 个回答';
    page.window.document.body.append(item);
    const link = item.querySelector("a");

    link.dispatchEvent(new page.window.MouseEvent("mouseover", { bubbles: true }));

    expect(link.title).toBe("这是一个在侧栏中会被截断的完整相关问题标题");
    expect(link.hasAttribute("data-zb-related-question-tooltip")).toBe(true);

    feature.destroy();
    expect(link.hasAttribute("title")).toBe(false);
    expect(link.hasAttribute("data-zb-related-question-tooltip")).toBe(false);
  });

  it("contains the official colors for all four flavors and styles the hidden sidebar", () => {
    for (const flavor of ["latte", "frappe", "macchiato", "mocha"]) {
      expect(CATPPUCCIN_THEME_STYLE).toContain(flavors[flavor].colors.base.hex);
      expect(CATPPUCCIN_THEME_STYLE).toContain(`html[data-zb-theme="${flavor}"]`);
    }
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Topstory-mainColumn + * .Card");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Topstory-mainColumnCard:empty");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PinDetail .PinItem a.LinkCard {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.PinDetail\n    .PinItem\n    a[href*="/ring/host/"] {',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      'a[href*="/ring/host/"]\n    :where(div, span, svg, path) {',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ":is(.LinkCard-title.loading, .LinkCard-desc.loading) {\n    background-color: var(--zb-surface-hover) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".PinDetail\n    .PinItem\n    .ContentItem-actions\n    > .PinToolbar-actions {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "width: 100% !important;\n    margin: -10px 0 !important;\n    padding: 10px 0 !important;\n    background-color: transparent !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".PinDetail\n    .PinItem\n    .ContentItem-actions\n    .Button:not(.VoteButton) {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".PinDetail\n    .PinItem\n    .ContentItem-actions\n    .VoteButton {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "body\n    main\n    .PinDetail\n    .PinItem\n    .Comments-container\n    > div\n    > div:has(.InputLike.Editable) {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "margin: 0 !important;\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n    padding: 10px 0 !important;\n    padding-inline: 0 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".PinDetail\n    .Comments-container\n    .InputLike.Editable {\n    background-color: transparent !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PinDetail .FollowButton.Button--grey {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".PinDetail\n    .FollowButton.Button--grey:is(:hover, :focus-visible) {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "background-color: var(--zb-danger-soft) !important;\n    border-color: var(--zb-danger) !important;\n    color: var(--zb-danger) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> .Modal-content > .VoterList) {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal-content:has(> .VoterList) {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".VoterList > .Topbar {\n    background-color: var(--zb-surface) !important;\n    border-bottom: 1px solid var(--zb-border) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".VoterList-content .List-item::after {\n    border-bottom-color: var(--zb-border) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.VoterList-content\n    :is(\n      .Skeleton,\n      [class*="skeleton" i],\n      .PlaceHolder,',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".VoterList-content .PlaceHolder-bg {\n    background: linear-gradient(",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".VoterList-content\n    :is(.PlaceHolder-mask, .PlaceHolder-mask path) {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".VoterList-content img.Avatar {\n    background-color: var(--zb-surface-raised) !important;\n    border-radius: 50% !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".VoterList-content\n    .FollowButton.Button--grey:is(:hover, :focus-visible) {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".VoterList-content\n    .FollowButton.Button--grey:is(:hover, :focus-visible)\n    :where(span, svg, path) {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PlaceHolder-inner");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .PlaceHolder-bg");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .PlaceHolder-mask path");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.BounceLoading[style*="width: 60px"][style*="height: 18px"]',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".BounceLoading-child");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ":is(.LinkCard-title.loading, .LinkCard-desc.loading)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".skeleton__line");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".skeleton__line::after");
    expect(CATPPUCCIN_THEME_STYLE).toContain('[data-za-detail-view-path-module="RightSideBar"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-home-sidebar] .Card");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '[data-za-detail-view-path-module="RightSideBar"]\n    .Card\n    :where(div, span)',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Card:is(:focus-visible, :focus-within)");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(":has(> :is(a, button):focus-visible)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border: 1px solid var(--zb-border) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(":is(.Card, .HotSearchCard) {");
    expect(CATPPUCCIN_THEME_STYLE).toContain('[aria-label="创作中心卡片"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain('[aria-label="创作中心卡片"]\n    :where(div, span)');
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".CreatorEntrance-creatorIcon {\n    color: var(--zb-text) !important",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("background-clip: padding-box !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain('a[href="/creator"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain('a[href="/question/waiting"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain('a[href="/consult"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain('a[href="/education/learning"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".KfeCollection-CreateSaltCard-button");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "[data-zb-follow-card]\n    .FollowButton.Button--grey",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ':is(\n      [data-zb-home-sidebar],\n      [data-za-detail-view-path-module="RightSideBar"]\n    )\n    [data-zb-follow-card]',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-author-follow-row]");
    expect(CATPPUCCIN_THEME_STYLE).toContain(":is(.AuthorInfo-head, .AuthorInfo-detail)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 0 0 auto !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("white-space: nowrap !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea :where(section, div, span)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".WriteArea,\n  html[data-zb-theme] .Topstory-mainColumnCard",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-radius: 12px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("overflow: clip !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("--zb-text-secondary");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".SearchBar-searchButton\n    .SearchBar-searchIcon");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".SearchBar-searchIcon.isFocus");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".SearchBar-input--focus\n    .SearchBar-searchButton",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".SearchBar-askDropdownButton\n    .ZDI--PlusFill24");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".SearchBar-menu .Menu-item.is-active");
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(+ .Topstory-hot)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(+ .Topstory-hot)\n    div");
    expect(CATPPUCCIN_THEME_STYLE).toContain(":has(.hot-column-container)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Topstory-hot .HotItem-title");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Topstory-hot .HotItem-excerpt");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Topstory-hot .HotItem-label");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Topstory-hot .HotItem:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(
      ".Topstory-hot .HotItem:hover {\n    background-color:",
    );
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(
      ".Topstory-hot .HotItem:focus-visible {\n    background-color:",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-right: 0 !important;");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin-left: 0 !important;");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding: 16px !important;");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".hot-column-container {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".hot-column .column-title");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".hot-column .card :is(.name, .topic)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".hot-column .line");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".hot-column-container .more-container {\n    box-sizing: border-box !important;\n    position: static !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".hot-column-container {\n    box-sizing: border-box !important;\n    height: auto !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "margin-bottom: 12px !important;\n    padding-bottom: 0 !important;\n    overflow: hidden !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".hot-column-container .more {\n    box-sizing: border-box !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".hot-column-container .more:focus-visible {\n    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".hot-column-container .more :is(svg, path)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".recommend-column .subscrib-card");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".recommend-column > div:first-child");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".recommend-column-content");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".recommend-column .content-title");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".recommend-column\n    :is(");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".recommend-column .subscrib-btn");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal .Ask-form .AskTitle-input");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal .Ask-form .AskDetail-input");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AskDetail-input:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal .Ask-form .Editable-toolbar");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(".Modal:has(.Ask-form)");
    expect(CATPPUCCIN_THEME_STYLE).toContain('.Editable-control[aria-pressed="true"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal:has(.SendGiftModal-GiftListWrapper)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".SendGiftModal-GiftListWrapper\n    > div\n    > div:last-child",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".SendGiftModal-RedpacketListWrapper");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".SendGiftModal-RedpacketListWrapper\n    > div:not(:empty)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain('a[href*="/grapp/protocol/payment"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain('.Modal:has(input[placeholder="0"])');
    expect(CATPPUCCIN_THEME_STYLE).toContain('input[placeholder="0"]::placeholder');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TopicInputAlias-suggestionContainer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".MentionSuggestions-menu .AutoComplete-UserName");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".MentionSuggestions-menu .Menu-item.is-active");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Editable-videoModal-uploader");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Editable-videoModal .Modal-footer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FollowButton.Button--blue");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-radius: 999px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FollowButton.Button--blue:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(
      "html[data-zb-theme] .ContentItem-actions\n    .Button:not(.VoteButton):focus-visible",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-follow-card]");
    expect(CATPPUCCIN_THEME_STYLE).toContain("> [data-zb-follow-card-track]");
    expect(CATPPUCCIN_THEME_STYLE).toContain("> [data-zb-follow-card-slide]");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(".Card:has(.FollowButton)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 0 0 100% !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-right: 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain('[role="dialog"]:is(');
    expect(CATPPUCCIN_THEME_STYLE).toContain(":has(.OrgCreateButton)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(':has(a[href^="/term/"])');
    expect(CATPPUCCIN_THEME_STYLE).toContain(':has(a[href="/question/19581624"])');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".OrgCreateButton:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain('div:has(> [role="dialog"][id^="react-aria-"])');
    expect(CATPPUCCIN_THEME_STYLE).toContain("overflow-y: auto !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("scrollbar-width: thin !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("> svg {\n    color: var(--zb-surface)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("box-shadow: none !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TopstoryItem .RichContent-inner .RichText");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionRichText-more.Button,");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionRichText-more.Button:is(:hover, :focus-visible)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionRichText--collapsed:is(:hover, :focus-within)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionRichText-more.Button\n    svg");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerItem\n    .ContentItem-expandButton.Button {");
    expect(CATPPUCCIN_THEME_STYLE).toContain("width: max-content !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin: 8px auto 0 !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ContentItem-expandButton.Button:is(:hover, :focus-visible)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea > div > section");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea .WritePinV2-Form");
    expect(CATPPUCCIN_THEME_STYLE).toContain("max-width: 100% !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea textarea");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea .TitleArea");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea .InputLike.Editable");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea .public-DraftEditor-content");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea:has(.WritePinV2-Form) .TitleArea");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding: 9px 12px 7px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".WriteArea:has(.WritePinV2-Form) .AppHeader-profileAvatar",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin-top: 11px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".EditorArea\n    .InputLike.Editable:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea:has(.WritePinV2-Form)\n    .EditorArea");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".InputLike.Editable\n    .public-DraftEditorPlaceholder-inner",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".WriteArea:has(.WritePinV2-Form) .TitleArea > div:last-child {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("top: 50% !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("right: 12px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("line-height: 20px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("transform: translateY(-50%) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".InputLike.Editable::-webkit-scrollbar-track");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".InputLike.Editable::-webkit-scrollbar-thumb:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin-block: 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("background-clip: content-box !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("scrollbar-color: var(--zb-text-subtle) transparent");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Editable-languageSuggestions");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TopicSuggestion-TopicItem");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TopicSuggestion-TopicItem .topic-name");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TopicSuggestion-Popover .Menu-item.is-active");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".EmoticonPopover > svg");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".EmoticonPopover li:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".EmoticonPopover\n    > div:last-child\n    > div:last-child",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".EmoticonPopover\n    > div:last-child\n    > div:first-child\n    li {\n    padding-block: 2px !important;\n    padding-inline: 3px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("> .css-1c21y8s");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal:has(.MaterialLibrary-SearchInputContainer)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> button.Button--primary)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      'div:has(> input[placeholder="输入关键字查找图片"]):focus-within',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("background-color: transparent !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("> div:last-child:has(> button)");
    expect(CATPPUCCIN_THEME_STYLE).toContain('div:has(> div > input[type="file"][multiple])');
    expect(CATPPUCCIN_THEME_STYLE).toContain('.Modal:has(canvas[alt="二维码"])');
    expect(CATPPUCCIN_THEME_STYLE).toContain("> div:nth-last-child(2)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal:has(.VideoUploadButton-fileInput)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("> div:has(> svg + div)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".VoteTypeSelectorPopover > div > div:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".VoteTypeSelectorPopover > div > div:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".CommentSetting-submenuBox > div:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".RingSetting-submenuBox .Input-wrapper:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain("> div:has(> img):hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.Modal:has(input[placeholder*="PK 标题"], input[placeholder*="投票 标题"])',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain('div:has(> input[type="text"]):focus-within');
    expect(CATPPUCCIN_THEME_STYLE).toContain('input[type="text"]::placeholder');
    expect(CATPPUCCIN_THEME_STYLE).toContain('input[placeholder*="投票 标题"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain("svg.ZDI--Plus24 + div");
    expect(CATPPUCCIN_THEME_STYLE).toContain('html[data-zb-theme][data-zb-poll-modal-open="true"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-poll-option-popover]");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("html[data-zb-theme]:has(");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("div:has(> svg + div > div:nth-child(8))");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(":has(> svg + div > div:nth-child(9))");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-home-sidebar] :where(div, span)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HotSearchCard-itemText");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PushNotifications-menuContainer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Messages-menuContainer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Popover-arrow::after");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PushNotifications-selectedTabIcon");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PushNotifications-item a:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PushNotifications-item::after");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Messages-item::after");
    expect(CATPPUCCIN_THEME_STYLE).toContain("text-underline-offset: 2px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Messages-newItem");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Messages-itemContent");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Messages-footer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Notifications-footer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Messages-menuContainer .Messages-footer {\n    box-sizing: border-box !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Messages-footer\n    > button.Button {\n    box-sizing: border-box !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> button.Button:first-child {\n    background-color: var(--zb-primary-soft) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> button.Button:last-child {\n    background-color: var(--zb-surface-raised) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .ChatWrapper > .Chat {\n    background-color: var(--zb-surface) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .ChatSideBar {\n    background-color: var(--zb-surface) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .ChatUserListItem {\n    box-sizing: border-box !important;\n    width: calc(100% - 16px) !important;\n    margin: 4px 8px !important;\n    padding: 11px 12px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .ChatUserListItem::after {\n    display: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatListGroup-SectionTitle--bottomBorder::after {\n    display: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatListGroup-SectionTitle--topBorder::before {\n    display: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "background-color: var(--zb-primary-soft) !important;\n    border-color: var(--zb-primary) !important;\n    box-shadow: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatSideBar-Search-ResultListWrap {\n    background-color: var(--zb-surface) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatUserListItem\n    .Chat-ActionMenuPopover-Button {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    flex: 0 0 30px !important;\n    width: 30px !important;\n    height: 30px !important;\n    right: 6px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatUserListItem\n    .ChatUserListItem-Content {\n    box-sizing: border-box !important;\n    min-width: 0 !important;\n    padding-right: 34px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      'html[data-zb-theme][data-zb-messages-page="true"]\n' + "    [data-zb-action-menu-popover]",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '[data-zb-messages-page="true"]\n' +
        "    [data-zb-action-menu-popover]\n" +
        "    > .ActionMenu\n" +
        "    > .ActionMenu-item:first-child {",
    );
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("body:has(.App-main .Chat)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AbnormalAlert.ChatBox-alert {\n    box-sizing: border-box !important;\n    width: min(488px, calc(100% - 32px)) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AbnormalAlert\n    .AbnormalAlert-message {\n    min-width: 0 !important;\n    color: inherit !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AbnormalAlert\n    .AbnormalAlert-icon {\n    box-sizing: border-box !important;\n    flex: 0 0 28px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".App-main .Chat .ChatBox-emptyImage path {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .CardMessage {\n    background-color: var(--zb-surface) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .CardMessage::before {\n    background-color: var(--zb-surface) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .CardMessage > :first-child {\n    background-color: var(--zb-surface) !important;\n    border-bottom: 1px solid var(--zb-border-strong) !important;\n    box-shadow: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .CardMessage > :last-child {\n    display: grid !important;\n    gap: 2px !important;\n    padding: 8px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".CardMessage\n    > :last-child\n    > div {\n    background-color: transparent !important;\n    border: 1px solid var(--zb-border) !important;\n    border-radius: 8px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div:is(:hover, :focus-visible) {\n    background-color: var(--zb-surface-raised) !important;\n    border-color: var(--zb-primary) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .IconListMessage > div {\n    background-color: transparent !important;\n    border: 1px solid var(--zb-border) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".IconListMessage\n    > div\n    :where(div, span) {\n    color: inherit !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".IconListMessage > div > img {\n    clip-path: inset(0 -32px 0 100%) !important;\n    filter: drop-shadow(32px 0 0 var(--zb-primary)) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".IconListMessage\n    > div:is(:hover, :focus-visible) {\n    background-color: var(--zb-surface-raised) !important;\n    border-color: var(--zb-primary) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".IconListMessage\n    > div:focus-visible {\n    box-shadow: 0 0 0 2px var(--zb-primary-soft) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".CardMessage\n    > :first-child\n    svg {\n    color: var(--zb-primary) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Chat-ChatBox\n    > div:has(.ZDI--ChatBubbleTwo24)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div:has(.ZDI--ChatBubbleTwo24)\n    > div\n    > div {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .InputBox-input {\n    box-sizing: border-box !important;\n    width: 100% !important;\n    padding: 0 14px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.InputBox\n    :is(textarea, input, [contenteditable="true"]) {\n    box-sizing: border-box !important;\n    padding: 10px 12px !important;',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .InputBox-footer {\n    box-sizing: border-box !important;\n    width: 100% !important;\n    min-height: 51px !important;\n    padding: 9px 16px 10px !important;\n    background-color: var(--zb-surface) !important;\n    border-top: 0 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .InputBox > .ToolBar {\n    border-top-color: var(--zb-border) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .TextMessage {\n    background-color: var(--zb-surface-raised) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".App-main .Chat .MessagesBox .css-1oxfz4p {\n    box-sizing: border-box !important;\n    max-width: calc(100% - 32px) !important;\n    background-color: var(--zb-surface-raised) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ChatBoxModal > div:has(> .Modal-content)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatBoxModal\n    :is(.Modal-content, .Chat-ChatBox, .MessagesBox, .InputBox)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ChatBoxModal .Chat-ChatBox > header");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatBoxModal .TextMessage {\n    background-color: var(--zb-surface-raised) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TextMessage.TextMessage-receiver");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatBoxModal\n    :is(time, .Message-status, .InputBox-footerDesc)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatBoxModal .InputBox-input {\n    background-color: transparent !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Emoticons.EmoticonTool-panel {\n    background-color: var(--zb-surface-raised) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Emoticons.EmoticonTool-panel .EmoticonsFooter {");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-action-menu-popover]\n    > .ActionMenu {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> .ActionMenu\n    > .ActionMenu-item {\n    box-sizing: border-box !important;\n    width: calc(100% - 12px) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> .ActionMenu\n    > .ActionMenu-item:first-child {\n    background-color: color-mix(",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("var(--zb-danger) 12%,\n      transparent");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> .ActionMenu-item:is(:hover, :focus-visible) {\n    background-color: var(--zb-surface-hover) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ChatBoxModal .Chat-ChatBox:has(.Checkbox-input) {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "flex-direction: column !important;\n    min-height: 0 !important;\n    height: 100% !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Chat-ChatBox:has(.Checkbox-input)\n    > :last-child {\n    box-sizing: border-box !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> button:has(.ZDI--ExclamationTriangle24) {\n    width: 72px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div:has(.MessagesBox) {\n    min-height: 0 !important;\n    height: auto !important;\n    flex: 1 1 auto !important;\n    overflow: clip !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(".ChatBoxModal .InputBox {\n    border-top:");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ChatBoxModal-closeButton:is(:hover, :focus-visible)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Popover-content .Menu > .Menu-item");
    expect(CATPPUCCIN_THEME_STYLE).toContain("width: calc(100% - 12px) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin-right: 6px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-right: 14px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Menu\n    > .Menu-item:focus-visible");
  });

  it("applies a compact first-paint theme before the full stylesheet is ready", () => {
    expect(CRITICAL_THEME_STYLE.length).toBeLessThan(3_000);
    expect(CRITICAL_THEME_STYLE).toContain('html[data-zb-theme="system"]');
    expect(CRITICAL_THEME_STYLE).toContain("html[data-zb-theme] .Search-container");
    expect(CRITICAL_THEME_STYLE).toContain("html[data-zb-theme] .SearchMain > div");
    expect(CRITICAL_THEME_STYLE).toContain(
      'html[data-zb-theme][data-zb-creator-associated-account-page="true"]',
    );
    expect(CRITICAL_THEME_STYLE).not.toContain(
      '.Card:has(.Tabs a[href="/creator/account/associated-account"])',
    );
    expect(CRITICAL_THEME_STYLE).toContain("> .Card\n    > div\n    > div");
    expect(CRITICAL_THEME_STYLE).toContain("background-color: var(--zb-early-surface) !important");

    for (const flavor of ["latte", "frappe", "macchiato", "mocha"]) {
      expect(CRITICAL_THEME_STYLE).toContain(`html[data-zb-theme="${flavor}"]`);
      expect(CRITICAL_THEME_STYLE).toContain(flavors[flavor].colors.mantle.hex);
      expect(CRITICAL_THEME_STYLE).toContain(flavors[flavor].colors.base.hex);
    }
  });

  it("styles follow-feed cards and sidebar without relying on the home-page marker", () => {
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "html[data-zb-theme] .TopstoryItem.TopstoryItem-isFollow {",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "html[data-zb-theme] .TopstoryItem.TopstoryItem-isFollow:hover",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "html[data-zb-theme] .TopstoryItem.TopstoryItem-isFollow:focus-visible",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TopstoryItem-isFollow\n    .ContentItem-title");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".TopstoryItem-isFollow\n    .FollowButton.Button--blue",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".TopstoryItem-isFollow\n    .ContentItem-actions\n    .Button:not(.VoteButton)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TopstoryItem-isFollow\n    .ContentItem-more");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.TopstoryItem-isFollow\n    .ContentItem-actions\n    .Button[aria-label="已收藏"]',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".TopstoryItem-isFollow\n    .ContentItem-actions\n    .Button:is(",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Topstory-container > .Topstory-mainColumn + *\n    )\n    :is(\n      .CreatorEntrance-hint,",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".HotSearchCard-title,\n      .HotSearchCard-itemText,",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(":is(.HotSearchCard-item, .HotSearchCard-itemLink)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HotSearchCard-item:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HotSearchCard-item:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin: 4px -8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding: 6px 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Topstory-container > .Topstory-mainColumn + *\n    )\n    .HotSearchCard-tag",
    );
  });

  it("themes the native toolbar inside a pin item in both normal and sticky flow", () => {
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /html\[data-zb-theme\] \.PinItem \.PinToolbar-actions \{[^}]*background-color: var\(--zb-surface\) !important;[^}]*border-color: var\(--zb-border\) !important;[^}]*color: var\(--zb-text-muted\) !important;[^}]*\}/,
    );
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("html[data-zb-theme] .PinToolbar-actions {");
  });

  it("styles question page headers, sidebars, overlays, editors, and floating controls", () => {
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader-footer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(":is(.FollowButton, .WriteAnswerButton)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".PageHeader\n    .QuestionButtonGroup\n    :is(.FollowButton, .WriteAnswerButton)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FollowButton.Button--blue");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader .WriteAnswerButton");
    expect(CATPPUCCIN_THEME_STYLE).toContain("background-color: transparent !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-color: var(--zb-primary) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionHeader-footer\n    .QuestionHeaderActions\n    .Button,",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader-actions\n    > .Button {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionHeader-actions\n    > .Button:focus-visible",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader-actions\n    > .Button\n    svg");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin-left: 4px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionHeader-footer\n    .QuestionHeaderActions\n    .Button--iconOnly",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("min-height: 34px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 0 0 16px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PageHeader .QuestionHeader-title");
    expect(CATPPUCCIN_THEME_STYLE).toContain("font-size: 22px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      'html[data-zb-theme][data-zb-question-content-under-header="true"]',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '[data-zb-question-content-under-header="true"]\n    .AppHeader',
    );
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(".AppHeader:has(.PageHeader.is-shown)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("0 10px 0 var(--zb-page)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Question-mainColumn\n    :is(.AnswerCard, .ViewAll, .MoreAnswers)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-mainColumn .AnswersNavWrapper > .List");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswersNavWrapper\n    .List-item {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswersNavWrapper\n    .List-item:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswersNavWrapper\n    .List-item::after");
    expect(CATPPUCCIN_THEME_STYLE).toContain("display: none !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-mainColumn .MoreAnswers .List-headerText");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".MoreAnswers\n    :is(.List-header, .List-item)::after",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Question-sideColumn .AnswerAuthor .Card-section::after",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ":is(.AnswerItem-authorInfo, .AnswerAuthor-buttons)\n    .FollowButton",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AnswerAuthor-buttons\n    .Button:not(.FollowButton)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Button:not(.FollowButton):focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FollowButton.Button--blue");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FollowButton.Button--grey");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".FollowButton.Button--grey:is(:hover, :focus-visible)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("background-color: var(--zb-danger-soft) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-color: var(--zb-danger) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("color: var(--ctp-crust) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.Question-sideColumn\n    > div[style*="position: sticky"][style*="overflow: auto"]::-webkit-scrollbar',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("scrollbar-width: none !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn :is(.Footer, footer)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Question-sideColumn\n    footer\n    :where(a, button, div, span, p, svg)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn .HotSearchCard-itemText");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn .HotSearchCard");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-hover-card]");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-right: 16px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("top: -8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-hover-card-avatar-row]");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-bottom: 21px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-hover-card] .HoverCard-description");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".NumberBoard-itemValue");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerAuthor\n    .NumberBoard-itemName");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerAuthor\n    .NumberBoard-itemValue");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerAuthor\n    .NumberBoard-item:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerAuthor\n    .NumberBoard-item:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HoverCard-buttons\n    .Button");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-hover-card] .HoverCard-buttons");
    expect(CATPPUCCIN_THEME_STYLE).toContain("gap: 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 1 1 0 !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-hover-card] .NumberBoard-item");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HoverCard-buttons\n    .FollowButton.Button--grey");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HoverCard-buttons\n    .Button:not(.FollowButton)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-hover-card-single-action]");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("div:has(> .HoverCard-item)");
    expect(CATPPUCCIN_THEME_STYLE).toContain('content: "取消关注" !important');
    expect(CATPPUCCIN_THEME_STYLE).toContain("height: 34px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("position: absolute !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("inset: 0 !important");

    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container::before");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container::after");
    expect(CATPPUCCIN_THEME_STYLE).toContain("content: none !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ContentItem-action:has(.ZDI--ChatBubbleFill24)::after",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .RichContent--hasHotComment");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.QuestionPage\n    a:is([href*="/people/"], [href*="/org/"]):not(:has(img.Avatar))',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "color: var(--zb-primary) !important;\n    cursor: pointer !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "background-color: transparent !important;\n    color: var(--zb-primary-hover) !important;\n    outline: 0 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionPage\n    .List-item:has(.Comments-container) {\n    overflow: clip !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionPage\n    img:is(.lazy, .origin_image.zh-lightbox-thumb) {\n    animation: none !important;\n    opacity: 1 !important;\n    transition: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container\n    > div:first-child\n    > div:nth-child(2)\n    > div:first-child",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container .CommentContent");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container\n    a:not(:has(img.Avatar))");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Button:is(.Button--withLabel, .Button--secondary) {\n    box-sizing: border-box !important;\n    border-radius: 6px !important;\n    color: var(--zb-text-secondary) !important;\n    min-height: 32px !important;\n    padding-inline: 10px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container\n    [data-id]\n    > .Button.Button--secondary {\n    background-color: var(--zb-surface-raised) !important;\n    border: 1px solid var(--zb-border-strong) !important;\n    margin-top: -4px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container {\n    border: 0 !important;\n    border-radius: 8px !important;\n    box-shadow: none !important;\n    outline: 0 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container > div:first-child {\n    border: 0 !important;\n    display: flex !important;\n    flex-direction: column !important;\n    outline: 0 !important;\n    padding-bottom: 0 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container\n    > div:first-child\n    > div:has(.InputLike.Editable) {\n    background-color: var(--zb-surface) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container\n    > div:first-child\n    > div:first-child:has(.InputLike.Editable) {\n    bottom: 0 !important;\n    border-top: 0 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "margin-bottom: 0 !important;\n    margin-inline: -20px !important;\n    order: 100 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "position: sticky !important;\n    top: auto !important;\n    transform: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container\n    > div:first-child\n    > div:first-child:has(.InputLike.Editable)\n    > div:first-child {\n    margin-bottom: 0 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container\n    > div:first-child\n    > div:has(.InputLike.Editable):not(:has([data-id])):not(:first-child) {\n    display: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container\n    > div:first-child\n    > div:nth-child(2) {\n    border: 1px solid var(--zb-border-strong) !important;\n    outline: 0 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container\n    > div:first-child\n    > div:nth-child(2)\n    > div:has(> .ZDI--ArrowRightSmall24) {\n    border-radius: 6px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div:has(> .ZDI--ArrowRightSmall24)::before {\n    border: 0 !important;\n    content: none !important;\n    display: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div:has(> .ZDI--ArrowRightSmall24):is(\n      :hover,\n      :focus-within,\n      :active\n    ) {\n    background-color: var(--zb-primary-soft) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container\n    .InputLike.Editable");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container [data-id] [data-id]::before");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.Comments-container\n    div:has(> div + svg[width="656"][height="44"])',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container .PlaceHolder-bg");
    expect(CATPPUCCIN_THEME_STYLE).toContain("opacity: 1 !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '.Comments-container\n    div:has(\n      > .BounceLoading[style*="width: 60px"][style*="height: 18px"]\n    ) {\n    background-color: var(--zb-surface) !important;\n    border: 0 !important;\n    box-shadow: none !important;',
    );
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(
      '.Comments-container\n    :is(\n      .Skeleton,\n      [class*="skeleton" i],\n      .PlaceHolder,\n      .PlaceHolder-inner,\n      [class*="placeholder" i]:not([class*="DraftEditorPlaceholder"]),\n      [class*="loading" i]',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Comments-container .BounceLoading {\n    background: transparent !important;\n    border: 0 !important;\n    box-shadow: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container .BounceLoading-child");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Comments-container .ZDI--ArrowUpSmall24");
    expect(CATPPUCCIN_THEME_STYLE).toContain("button:has(.ZDI--ArrowUpSmall24)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      'body\n    > div\n    > div\n    > div:has(> svg[width="26"][height="10"] + div) {',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "fill: var(--zb-surface-raised) !important;\n    filter: drop-shadow(0 1px 0 var(--zb-border-strong)) !important;\n    left: 50% !important;\n    margin-top: 4px !important;\n    stroke: none !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '> div:has(> svg[width="26"][height="10"] + div)\n    > div\n    > div:is(:hover, :focus, :focus-visible)',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '> div:has(> svg[width="26"][height="10"] + div)\n    > svg\n    + div {\n    color: var(--zb-text) !important;',
    );

    expect(
      CATPPUCCIN_THEME_STYLE.match(/html\[data-zb-theme\] \[data-zb-comment-modal\] \{/g),
    ).toHaveLength(1);
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(".Modal-content:has(.CommentContent)");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain(
      ".Modal-content:has(.InputLike.Editable):has(img.Avatar)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "html[data-zb-theme] [data-zb-comment-modal] {\n" +
        "    background-color: var(--zb-surface) !important;\n" +
        "    border-color: var(--zb-border) !important;\n" +
        "    color: var(--zb-text) !important;\n" +
        "    box-shadow: var(--zb-shadow) !important;\n" +
        "  }",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "[data-zb-comment-modal]\n    [data-id]\n    > div:first-child {\n    animation: none !important;\n    background-color: transparent !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-comment-modal]\n    .InputLike.Editable");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-inline: 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-comment-modal]\n    [data-id]");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "border-bottom: 1px solid var(--zb-border-strong) !important",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-id]\n    [data-id]::before");
    expect(CATPPUCCIN_THEME_STYLE).toContain("left: 34px !important");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("[data-id]:last-child {");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-comment-modal]\n    img.Avatar");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "[data-zb-comment-modal]\n    div:has(> div > div > .InputLike.Editable)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "[data-zb-comment-modal]\n    .Button.Button--primary",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Button:is(.Button--withLabel, .Button--secondary):is(",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div:has(> div:nth-child(2) > div:nth-child(3) [data-id])\n    > div:first-child\n    > div:only-child {\n    box-sizing: border-box !important;\n    padding: 4px 8px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div:nth-child(2):has(> div:nth-child(3) [data-id])\n    > div:nth-child(2)\n    > div:only-child {\n    color: var(--zb-text-muted) !important;\n    opacity: 1 !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "[data-zb-comment-modal]\n    .Button:is(.Button--withLabel, .Button--secondary) {\n    box-sizing: border-box !important;\n    border-radius: 6px !important;\n    color: var(--zb-text-secondary) !important;\n    min-height: 32px !important;\n    padding-inline: 10px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Button:is(\n      .Button--red,\n      .is-active,");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-comment-modal]");
    expect(CATPPUCCIN_THEME_STYLE).toContain("> .css-m0zh86");
    expect(CATPPUCCIN_THEME_STYLE).toContain('[class*="placeholder" i]');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PlaceHolder-mask path");
    expect(CATPPUCCIN_THEME_STYLE).toContain('div:has(> div + svg[width="656"][height="44"])');
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-comment-modal]\n    img.Avatar");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".comment_img");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      '[class*="placeholder" i]:not([class*="DraftEditorPlaceholder"])',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "div:has(> div > div > .InputLike.Editable:focus-within)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("div[data-zb-comment-composer-collapsed]");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "div:has(> div > div > .InputLike.Editable)\n    > div:first-child",
    );

    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .AnswerFormPortalContainer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .AnswerFormEditorContainer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .AnswerForm-editor");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .AIAssistantPanelV2-container");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .toolbarV3");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .ToolbarButton");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .ToolbarDivider");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionAnswers-answerAdd\n    > .AnswerAdd\n    > div:first-child {\n    background-color: var(--zb-surface) !important;\n    border-bottom: 1px solid var(--zb-border) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionAnswers-answerAdd\n    > .AnswerAdd\n    > div:nth-child(2) {\n    background-color: var(--zb-surface) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AIAssistantPanelV2-container\n    > div\n    > div:first-child {\n    background-color: var(--zb-surface) !important;\n    border: 1px solid var(--zb-border) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AIAssistantPanelV2-container\n    > div\n    > div:first-child\n    > div:last-child\n    > div {\n    background-color: var(--zb-surface-raised) !important;\n    border: 1px solid var(--zb-border) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div\n    > div:first-child\n    :where(div, span, svg) {\n    color: var(--zb-text) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div\n    > :last-child {\n    color: var(--zb-text-muted) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AnswerFormPortalContainer\n    .Catalog\n    > div:first-child\n    > div:first-child",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Catalog\n    .Catalog-Title:is(:hover, :focus-within)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Catalog\n    .Catalog-Title\n    > div {\n    background-color: transparent !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Catalog\n    .Catalog-Title:is(:hover, :focus-within)::before",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AnswerFormPortalContainer:has(.Catalog)\n    .toolbarV3\n    .ToolbarButton:has(.ZDI--Catalog24)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".ToolbarV3Menu-container\n    .Button\n    > span:last-child",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ReferenceModal :is(.InputLike, .Select-button)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ":is(.MaterialLibraryNav-Mine, .MaterialLibraryNav-Folder).active",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "div:has(> div:first-child > h1):has(\n      > div:last-child button.Button--primary",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain('.Modal:has(.Modal-content > div[class*="r-"])');
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".DraftHistoryModal\n    .PreviewEditableInstance.InputLike.Editable",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .EditorHelpDoc");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".EditorHelpDoc\n    div:has(> svg.ZDI)\n    > div:nth-child(n + 3)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain('textarea[placeholder="请描述你想要配图的内容"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain('[role="button"][aria-label^="选择"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Popover-content:has(.Menu-item > div > div:first-child:empty)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain('img[src*="editor_ai_image"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ZDI--ExclamationCircle24");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AIAssistantPanelV2-container\n    .CircleLoadingBar\n    .path",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TooltipContent.TooltipContent--white");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TooltipContent-arrow::after");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".TooltipContent\n    :where(.TooltipContent-children, div, span, p, strong)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("body .TooltipContent.TooltipContent--white *");
    expect(CATPPUCCIN_THEME_STYLE).toContain("-webkit-text-fill-color: var(--zb-text) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "button\n    :is(svg, path) {\n    color: inherit !important;\n    fill: currentColor !important;",
    );

    expect(CATPPUCCIN_THEME_STYLE).toContain(".Answers-select .Select-option");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".AnswersNavWrapper\n    .List-headerOptions\n    .Select-button",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 0 0 14px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Answers-select .Select-option {");
    expect(CATPPUCCIN_THEME_STYLE).toContain("height: 34px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("min-width: 116px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain('.Select-button[aria-expanded="true"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ShareMenu-content");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ShareMenu-button");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ShareMenu-divider");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ShareMenu-qrcodeSection");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".ShareMenu-qrcodeBox");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".CornerButton");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".CornerButton:hover");
  });

  it("styles question and answer links according to their semantic roles", () => {
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HotSearchCard-itemLink:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HotSearchCard-item:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin: 6px -8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding: 6px 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-radius: 10px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn .HotSearchCard-itemLink");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn .HotSearchCard-tag");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".SimilarQuestions-item");
    expect(CATPPUCCIN_THEME_STYLE).toContain(":is(.RelatedQuestions, .SimilarQuestions-list)");
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /\.SimilarQuestions-item[\s\S]*?\)\s*\{\s*box-sizing: border-box !important;[\s\S]*?align-items: center !important;[\s\S]*?gap: 12px !important;[\s\S]*?background-color: transparent !important;[\s\S]*?border: 0 !important;[\s\S]*?border-radius: 10px !important;[\s\S]*?white-space: nowrap !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /\.SimilarQuestions-item[\s\S]*?> a\[href\^="\/question\/"\][^{]*\{[\s\S]*?flex: 1 1 auto !important;[\s\S]*?min-width: 0 !important;[\s\S]*?overflow: hidden !important;[\s\S]*?text-overflow: ellipsis !important;[\s\S]*?white-space: nowrap !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".SimilarQuestions-item\n    ):is(:hover, :focus-within)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "background-color: var(--zb-surface-raised) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /\[data-za-detail-view-path-module="RelatedQuestions"\][\s\S]*?\.SimilarQuestions-item[\s\S]*?color: var\(--zb-text-muted\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /\.AnswerItem[\s\S]*?section[\s\S]*?> div:has\(> a\[href\*="\/column\/"\]\) \{[\s\S]*?background-color: var\(--zb-surface-raised\) !important;[\s\S]*?border: 1px solid var\(--zb-border\) !important;[\s\S]*?border-radius: 8px !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /> div:has\(> a\[href\*="\/column\/"\]\)[\s\S]*?> a\[href\*="\/column\/"\] \{[\s\S]*?color: var\(--zb-text-muted\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /> div:has\(> a\[href\*="\/column\/"\]\)[\s\S]*?> div[\s\S]*?a\[href\*="\/column\/"\][\s\S]*?> div[\s\S]*?> div:first-child \{[\s\S]*?color: var\(--zb-text\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /> div:nth-child\(2\)[\s\S]*?:where\(div, span\) \{[\s\S]*?color: var\(--zb-text-secondary\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /> div:nth-child\(2\)[\s\S]*?> div:last-child \{[\s\S]*?color: var\(--zb-text-muted\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /> div:has\(> a\[href\*="\/column\/"\]\)[\s\S]*?a\[href\*="\/column\/"\]::before \{[\s\S]*?border-bottom-color: var\(--zb-border-strong\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      'a[href*="/column/"]:focus-visible {\n' +
        "    border-radius: 6px !important;\n" +
        "    outline: 2px solid var(--zb-primary) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 0 0 auto !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("width: auto !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("min-width: 24px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding: 0 5px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("white-space: nowrap !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ":is(.ContentItem-actions, .RichContent-actions)\n    .Button:not(.VoteButton)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .VoteButton");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".RichContent-actions.is-fixed");
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /\.RichContent-actions\.is-fixed\s*\{[^}]*background-clip: border-box !important;[^}]*border: 0 !important;[^}]*border-top: 1px solid var\(--zb-border\) !important;[^}]*border-radius: 0 !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> .Modal-content)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal .Topbar");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("div:has(> .Modal-content:has(.CommentContent))");
    expect(CATPPUCCIN_THEME_STYLE).toContain("min-height: 28px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-radius: 6px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important",
    );
  });

  it("presents saved favorite-list buttons as cancel actions on hover and focus", () => {
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FavlistsModal .Modal-inner");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FavlistsModal .Favlists-items");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FavlistsModal .Favlists-item");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-bottom-color: var(--zb-border) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Favlists-item:is(:hover, :focus-within)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FavlistsModal .Favlists-itemInner");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FavlistsModal .Favlists-itemNameText");
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 0 0 76px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FavlistsModal .Favlists-updateButton.Button--blue");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FavlistsModal .Favlists-actions");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FavlistsModal .Modal-closeButton");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "body\n    .FavlistsModal\n    .Favlists-updateButton.Button--grey:is(:hover, :focus-visible)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain('content: "取消收藏" !important');
    expect(CATPPUCCIN_THEME_STYLE).toContain("-webkit-text-fill-color: transparent !important");
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /body[\s\S]*?\.FavlistsModal[\s\S]*?\.Favlists-updateButton\.Button--grey:is\(:hover, :focus-visible\)[^{]*\{[\s\S]*?background-color: var\(--zb-danger-soft\) !important;[\s\S]*?color: transparent !important;[\s\S]*?-webkit-text-fill-color: transparent !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Favlists-updateButton.Button--grey:focus-visible {\n    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;",
    );
  });

  it("themes the transient favorite success prompt", () => {
    const page = createPage();
    page.window.document.body.innerHTML = `
      <div class="prompt-wrapper">
        <div class="prompt">
          <div><span>收藏成功</span></div>
          <div></div>
          <div><button>选择收藏夹 <svg class="ZDI--ArrowRight24"></svg></button></div>
        </div>
      </div>
    `;
    const feature = createThemeFeature(page.window);
    feature.start();

    expect(
      page.window.document
        .querySelector(".prompt-wrapper")
        .hasAttribute("data-zb-arrow-action-panel-wrapper"),
    ).toBe(true);
    expect(
      page.window.document.querySelector(".prompt").hasAttribute("data-zb-arrow-action-panel"),
    ).toBe(true);
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "html[data-zb-theme] [data-zb-arrow-action-panel-wrapper]",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-arrow-action-panel-wrapper]");
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-arrow-action-panel]");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "background-color: var(--zb-surface-raised) !important",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("background-color: var(--zb-primary-soft) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("overflow: hidden !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("min-width: max-content !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding: 4px 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "box-shadow: inset 0 0 0 1px var(--zb-primary) !important",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "> div:first-child\n    span {\n    color: var(--zb-text) !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /> div:nth-child\(2\) \{\s*background-color: transparent !important;/,
    );
    feature.destroy();
  });
});
