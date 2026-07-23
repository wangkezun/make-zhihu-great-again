import { flavors } from "@catppuccin/palette";
import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it } from "vitest";

import { createThemeFeature, THEME_MODES } from "../src/features/theme.js";
import { CATPPUCCIN_THEME_STYLE } from "../src/styles/catppuccin-theme.js";

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
    expect(commands.size).toBe(THEME_MODES.length);
    expect([...commands.values()].map(({ label }) => label)).toContain(
      "✓ 主题：跟随系统（Latte / Mocha）",
    );

    feature.destroy();
    expect(commands.size).toBe(0);
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

  it("contains the official colors for all four flavors and styles the hidden sidebar", () => {
    for (const flavor of ["latte", "frappe", "macchiato", "mocha"]) {
      expect(CATPPUCCIN_THEME_STYLE).toContain(flavors[flavor].colors.base.hex);
      expect(CATPPUCCIN_THEME_STYLE).toContain(`html[data-zb-theme="${flavor}"]`);
    }
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Topstory-mainColumn + * .Card");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Topstory-mainColumnCard:empty");
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
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .RichText a.LinkCard");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".RichText .LinkCard-image");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".RichText .LinkCard .tag");
    expect(CATPPUCCIN_THEME_STYLE).toContain(":not(.LinkCard):not(.tag)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".skeleton__line");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".skeleton__line::after");
    expect(CATPPUCCIN_THEME_STYLE).toContain('[data-za-detail-view-path-module="RightSideBar"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-zb-home-sidebar] .Card");
    expect(CATPPUCCIN_THEME_STYLE).toContain('[aria-label="创作中心卡片"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain("background-clip: padding-box !important");
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
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal:has(.Ask-form) .AskTitle-input");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal:has(.Ask-form) .AskDetail-input");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AskDetail-input:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal:has(.Ask-form) .Editable-toolbar");
    expect(CATPPUCCIN_THEME_STYLE).toContain('.Editable-control[aria-pressed="true"]');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".TopicInputAlias-suggestionContainer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".MentionSuggestions-menu .AutoComplete-UserName");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".MentionSuggestions-menu .Menu-item.is-active");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Editable-videoModal-uploader");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Editable-videoModal .Modal-footer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FollowButton.Button--blue");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-radius: 999px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".FollowButton.Button--blue:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Card:has(.FollowButton)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("> div:has(> div > div > .FollowButton)");
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
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea > div > section");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea .WritePinV2-Form");
    expect(CATPPUCCIN_THEME_STYLE).toContain("max-width: 100% !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea textarea");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea .TitleArea");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea .InputLike.Editable");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea .public-DraftEditor-content");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea:has(.WritePinV2-Form) .TitleArea");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".WriteArea:has(.WritePinV2-Form) .AppHeader-profileAvatar",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin-top: 11px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".EditorArea\n    .InputLike.Editable:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".WriteArea:has(.WritePinV2-Form)\n    .EditorArea");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".InputLike.Editable\n    .public-DraftEditorPlaceholder-inner",
    );
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
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> svg + div > div:nth-child(8))");
    expect(CATPPUCCIN_THEME_STYLE).toContain(":has(> svg + div > div:nth-child(9))");
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
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Popover-content .Menu > .Menu-item");
    expect(CATPPUCCIN_THEME_STYLE).toContain("width: calc(100% - 12px) !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin-right: 6px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-right: 14px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Menu\n    > .Menu-item:focus-visible");
  });

  it("styles question page headers, sidebars, overlays, editors, and floating controls", () => {
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader");
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
      ".QuestionHeader-footer .QuestionHeaderActions .Button",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionHeader-footer\n    .QuestionHeaderActions\n    .Button--iconOnly",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("min-height: 34px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 0 0 16px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PageHeader .QuestionHeader-title");
    expect(CATPPUCCIN_THEME_STYLE).toContain("font-size: 22px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader .NumberBoard-item");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader .NumberBoard-item.Button:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".NumberBoard-item.Button:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader .QuestionFollowStatus-counts");
    expect(CATPPUCCIN_THEME_STYLE).toContain("column-gap: 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".QuestionFollowStatus-counts\n    .NumberBoard-itemInner",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader .QuestionFollowStatus-people");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionFollowStatus-people:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-left: 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      'html[data-zb-theme][data-zb-question-content-under-header="true"]',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AppHeader:has(.PageHeader.is-shown)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("0 10px 0 var(--zb-page)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Question-mainColumn\n    :is(.AnswerCard, .ViewAll, .MoreAnswers)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-mainColumn .AnswersNavWrapper > .List");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswersNavWrapper\n    .List-item {");
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
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> .HoverCard-item)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-right: 16px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("top: -8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> .HoverCard-item) div:has(> .Avatar)");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-bottom: 21px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> .HoverCard-item) .HoverCard-description");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".NumberBoard-itemValue");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerAuthor\n    .NumberBoard-itemName");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerAuthor\n    .NumberBoard-itemValue");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerAuthor\n    .NumberBoard-item:hover");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".AnswerAuthor\n    .NumberBoard-item:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HoverCard-buttons .Button");
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> .HoverCard-item) .HoverCard-buttons");
    expect(CATPPUCCIN_THEME_STYLE).toContain("gap: 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("flex: 1 1 0 !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> .HoverCard-item) .NumberBoard-item");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage img.Avatar");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ":is(.AnswerItem .AuthorInfo, .AnswerAuthor)\n    img.Avatar",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HoverCard-buttons\n    .FollowButton.Button--grey");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HoverCard-buttons\n    .Button:not(.FollowButton)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HoverCard-buttons:has(> .Button:only-child)");
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

    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal-content:has(.CommentContent)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Modal-content:has(.CommentContent)\n    [data-id]\n    > div:first-child {\n    animation: none !important;\n    background-color: transparent !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Modal-content:has(.CommentContent)\n    .InputLike.Editable",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding-inline: 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal-content:has(.CommentContent)\n    [data-id]");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "border-bottom: 1px solid var(--zb-border-strong) !important",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("[data-id]\n    [data-id]::before");
    expect(CATPPUCCIN_THEME_STYLE).toContain("left: 34px !important");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("[data-id]:last-child {");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal-content:has(.CommentContent)\n    img.Avatar");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Modal-content:has(.CommentContent)\n    div:has(> div > div > .InputLike.Editable)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Modal-content:has(.CommentContent)\n    .Button.Button--primary",
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
      ".Modal-content:has(.CommentContent)\n    .Button:is(.Button--withLabel, .Button--secondary) {\n    box-sizing: border-box !important;\n    border-radius: 6px !important;\n    color: var(--zb-text-secondary) !important;\n    min-height: 32px !important;\n    padding-inline: 10px !important;",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Button:has(.ZDI--HeartFill24):is(:hover, :focus-visible)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Modal-content:has(.InputLike.Editable):has(img.Avatar)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("> .css-m0zh86");
    expect(CATPPUCCIN_THEME_STYLE).toContain('[class*="placeholder" i]');
    expect(CATPPUCCIN_THEME_STYLE).toContain(".PlaceHolder-mask path");
    expect(CATPPUCCIN_THEME_STYLE).toContain('div:has(> div + svg[width="656"][height="44"])');
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Modal-content:has(.InputLike.Editable):has(img.Avatar)\n    img.Avatar",
    );
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
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /\.QuestionHeader-topics[\s\S]*?:is\(a, \.TopicLink, \.Tag-content\)[\s\S]*?color: var\(--zb-primary\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ":is(a, .TopicLink, .Tag-content)\n    :where(span, div)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      'div:has(> svg):has(a[href*="/roundtable/"]):has(a[href*="/topic/"])',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("a\n    > svg:first-child");
    expect(CATPPUCCIN_THEME_STYLE).toContain("a\n    > svg:last-child");
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /:is\([\s\S]*?\.BrandQuestionSymbol-brandLink,[\s\S]*?\.BrandQuestionSymbol-name,[\s\S]*?\.UserLink-link[\s\S]*?\)[^{]*\{\s*color: var\(--zb-text\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /:is\(\.ContentItem-time, \.ContentItem-time a\)[^{]*\{\s*color: var\(--zb-text-muted\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /:is\(\.RichText, \.RichContent-inner\)[\s\S]*?a:not\(\.UserLink-link\):not\(\.TopicLink\)[\s\S]*?color: var\(--zb-primary\) !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /a\.RichContent-EntityWord:focus-visible[^{]*\{[\s\S]*?color: var\(--zb-primary-hover\) !important;[\s\S]*?text-decoration: underline !important;[\s\S]*?text-underline-offset: 2px !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toMatch(
      /\.QuestionPage[\s\S]*?:is\([\s\S]*?\.BrandQuestionSymbol-brandLink,[\s\S]*?\.QuestionHeader-topics a,[\s\S]*?\.NumberBoard-item[\s\S]*?\):focus-visible[^{]*\{[\s\S]*?outline: 2px solid var\(--zb-primary\) !important;[\s\S]*?outline-offset: 2px !important;/,
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HotSearchCard-itemLink:focus-visible");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".HotSearchCard-item:focus-within");
    expect(CATPPUCCIN_THEME_STYLE).toContain("margin: 6px -8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("padding: 6px 8px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-radius: 10px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn .HotSearchCard-itemLink");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn .HotSearchCard-tag");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .RichText table");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .RichText :is(th, td)");
    expect(CATPPUCCIN_THEME_STYLE).toContain('a[href*="zhida_source=below_banner_question"]');
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
    expect(CATPPUCCIN_THEME_STYLE).toContain("div:has(> .Modal-content)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal .Topbar");
    expect(CATPPUCCIN_THEME_STYLE).not.toContain("div:has(> .Modal-content:has(.CommentContent))");
    expect(CATPPUCCIN_THEME_STYLE).toContain("min-height: 28px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain("border-radius: 6px !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      "box-shadow: 0 0 0 2px var(--zb-primary-soft) !important",
    );
  });
});
