import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it } from "vitest";

import {
  createHomeSidebarFeature,
  HOME_SIDEBAR_STORAGE_KEY,
} from "../src/features/home-sidebar.js";
import { HOME_SIDEBAR_STYLE } from "../src/styles/home-sidebar.js";

const activePages = [];

const createPage = (url = "https://www.zhihu.com/") => {
  const page = new JSDOM(
    `<!doctype html>
      <html>
        <head></head>
        <body>
          <main>
            <div class="Topstory-container">
              <div class="Topstory-mainColumn">问题列表</div>
              <div class="right-column" data-za-detail-view-path-module="RightSideBar">
                <div role="complementary" aria-label="创作中心卡片">创作中心</div>
              </div>
            </div>
          </main>
        </body>
      </html>`,
    { pretendToBeVisual: true, url },
  );
  activePages.push(page);
  return page;
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("home sidebar feature", () => {
  it("contains an immediate structural selector to prevent first-paint flicker", () => {
    expect(HOME_SIDEBAR_STYLE).toContain(".Topstory-mainColumn ~ div");
    expect(HOME_SIDEBAR_STYLE).toContain('[data-za-detail-view-path-module="RightSideBar"]');
  });

  it("hides the semantic right column by default", () => {
    const page = createPage();
    const feature = createHomeSidebarFeature(page.window);

    feature.start();

    expect(page.window.document.documentElement.dataset.zbHideHomeSidebar).toBe("true");
    expect(
      page.window.document.querySelector(".right-column").hasAttribute("data-zb-home-sidebar"),
    ).toBe(true);

    feature.destroy();
  });

  it("restores a saved preference to show the right column", () => {
    const page = createPage();
    page.window.localStorage.setItem(HOME_SIDEBAR_STORAGE_KEY, "false");
    const feature = createHomeSidebarFeature(page.window);
    feature.start();

    expect(page.window.document.documentElement.dataset.zbHideHomeSidebar).toBe("false");
    expect(page.window.localStorage.getItem(HOME_SIDEBAR_STORAGE_KEY)).toBe("false");

    feature.destroy();
  });

  it("does not alter non-home pages", () => {
    const page = createPage("https://www.zhihu.com/question/123");
    const feature = createHomeSidebarFeature(page.window);

    feature.start();

    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("false");
    expect(
      page.window.document.querySelector(".right-column").hasAttribute("data-zb-home-sidebar"),
    ).toBe(false);

    feature.destroy();
  });

  it("registers a userscript menu command and keeps its status in sync", () => {
    const page = createPage();
    const commands = new Map();
    let nextCommandId = 1;
    let storedPreference = true;
    const settings = {
      getPreference: () => storedPreference,
      menu: {
        register: (label, callback) => {
          const commandId = nextCommandId++;
          commands.set(commandId, { callback, label });
          return commandId;
        },
        unregister: (commandId) => commands.delete(commandId),
      },
      setPreference: (value) => {
        storedPreference = value;
      },
    };
    const feature = createHomeSidebarFeature(page.window, settings);

    feature.start();
    const enabledCommand = [...commands.values()][0];
    expect(enabledCommand.label).toBe("隐藏首页右栏：已开启");

    enabledCommand.callback();
    const disabledCommand = [...commands.values()][0];
    expect(disabledCommand.label).toBe("隐藏首页右栏：已关闭");
    expect(storedPreference).toBe(false);
    expect(page.window.document.documentElement.dataset.zbHideHomeSidebar).toBe("false");

    feature.destroy();
    expect(commands.size).toBe(0);
  });
});
