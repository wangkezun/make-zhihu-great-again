import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it } from "vitest";

import {
  createHomeComposerFeature,
  HOME_COMPOSER_STORAGE_KEY,
} from "../src/features/home-composer.js";
import { createHomeSidebarFeature } from "../src/features/home-sidebar.js";
import { HOME_COMPOSER_STYLE } from "../src/styles/home-composer.js";

const activePages = [];

const createPage = () => {
  const page = new JSDOM(
    `<!doctype html><html data-zb-home-page="true"><head></head><body>
      <main class="Topstory-mainColumn"><div class="WriteArea">分享想法</div></main>
    </body></html>`,
    { url: "https://www.zhihu.com/" },
  );
  activePages.push(page);
  return page;
};

afterEach(() => {
  activePages.splice(0).forEach((page) => page.window.close());
});

describe("home composer feature", () => {
  it("shows the composer by default and injects a homepage-only rule", () => {
    const page = createPage();
    const feature = createHomeComposerFeature(page.window);

    feature.start();

    expect(page.window.document.documentElement.dataset.zbShowHomeComposer).toBe("true");
    expect(HOME_COMPOSER_STYLE).toContain('data-zb-home-page="true"');
    expect(HOME_COMPOSER_STYLE).toContain(".Topstory-mainColumn > .WriteArea");
    feature.destroy();
  });

  it("restores a saved hidden preference", () => {
    const page = createPage();
    page.window.localStorage.setItem(HOME_COMPOSER_STORAGE_KEY, "false");
    const feature = createHomeComposerFeature(page.window);

    feature.start();

    expect(page.window.document.documentElement.dataset.zbShowHomeComposer).toBe("false");
    feature.destroy();
  });

  it("applies the hidden preference to the /follow feed", () => {
    const page = new JSDOM(
      `<!doctype html><html><head></head><body>
        <main class="Topstory-mainColumn"><div class="WriteArea">分享想法</div></main>
      </body></html>`,
      { url: "https://www.zhihu.com/follow" },
    );
    activePages.push(page);
    page.window.localStorage.setItem(HOME_COMPOSER_STORAGE_KEY, "false");
    const routeFeature = createHomeSidebarFeature(page.window);
    const composerFeature = createHomeComposerFeature(page.window);

    routeFeature.start();
    composerFeature.start();

    expect(page.window.document.documentElement.dataset.zbHomePage).toBe("true");
    expect(page.window.document.documentElement.dataset.zbShowHomeComposer).toBe("false");

    composerFeature.destroy();
    routeFeature.destroy();
  });

  it("registers a menu toggle and persists its state", () => {
    const page = createPage();
    const commands = new Map();
    let nextCommandId = 1;
    let storedPreference = true;
    const feature = createHomeComposerFeature(page.window, {
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
    });

    feature.start();
    const visibleCommand = [...commands.values()][0];
    expect(visibleCommand.label).toBe("显示首页分享想法：已开启");

    visibleCommand.callback();
    const hiddenCommand = [...commands.values()][0];
    expect(hiddenCommand.label).toBe("显示首页分享想法：已关闭");
    expect(storedPreference).toBe(false);
    expect(page.window.document.documentElement.dataset.zbShowHomeComposer).toBe("false");

    feature.destroy();
    expect(commands.size).toBe(0);
  });
});
