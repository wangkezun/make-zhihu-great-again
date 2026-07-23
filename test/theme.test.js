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
      ":is(.LinkCard-title.loading, .LinkCard-desc.loading)",
    );
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
  });

  it("styles question page headers, sidebars, overlays, editors, and floating controls", () => {
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionHeader-footer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(":is(.FollowButton, .WriteAnswerButton)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".PageHeader\n    .QuestionButtonGroup\n    :is(.FollowButton, .WriteAnswerButton)",
    );
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
      '.Question-sideColumn\n    > div[style*="position: sticky"][style*="overflow: auto"]::-webkit-scrollbar',
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain("scrollbar-width: none !important");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn :is(.Footer, footer)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Question-sideColumn\n    footer\n    :where(a, button, div, span, p, svg)",
    );
    expect(CATPPUCCIN_THEME_STYLE).toContain(".Question-sideColumn .HotSearchCard-itemText");

    expect(CATPPUCCIN_THEME_STYLE).toContain(".Modal-content:has(.CommentContent)");
    expect(CATPPUCCIN_THEME_STYLE).toContain(
      ".Modal-content:has(.CommentContent)\n    .InputLike.Editable",
    );

    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .AnswerFormPortalContainer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .AnswerFormEditorContainer");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .AnswerForm-editor");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .AIAssistantPanelV2-container");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .toolbarV3");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .ToolbarButton");
    expect(CATPPUCCIN_THEME_STYLE).toContain(".QuestionPage .ToolbarDivider");

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
});
