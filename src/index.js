import { createAnswerActionsStickyFeature } from "./features/answer-actions-sticky.js";
import { createCommentComposerFeature } from "./features/comment-composer.js";
import { createHomeComposerFeature, HOME_COMPOSER_STORAGE_KEY } from "./features/home-composer.js";
import { createHomeSidebarFeature, HOME_SIDEBAR_STORAGE_KEY } from "./features/home-sidebar.js";
import { createHomeWidthFeature, HOME_WIDTH_STORAGE_KEY } from "./features/home-width.js";
import { createIdleTimerBlockerFeature } from "./features/idle-timer-blocker.js";
import { createPageContextFeature } from "./features/page-context.js";
import { createPageStylesFeature } from "./features/page-styles.js";
import {
  createTelemetryBlockerFeature,
  TELEMETRY_BLOCKER_STORAGE_KEY,
} from "./features/telemetry-blocker.js";
import { createThemeFeature, THEME_STORAGE_KEY } from "./features/theme.js";
import { PAGE_STYLE_ENTRIES } from "./styles/pages/index.js";
import { startWhenDocumentElementReady } from "./start.js";

const createMenuAdapter = () => ({
  register: (label, callback) => GM_registerMenuCommand(label, callback),
  unregister: (commandId) => GM_unregisterMenuCommand(commandId),
});

const userscriptSettings = {
  getPreference: (defaultValue) => GM_getValue(HOME_SIDEBAR_STORAGE_KEY, defaultValue),
  menu: createMenuAdapter(),
  setPreference: (value) => GM_setValue(HOME_SIDEBAR_STORAGE_KEY, value),
};

const themeSettings = {
  getMode: (defaultValue) => GM_getValue(THEME_STORAGE_KEY, defaultValue),
  menu: createMenuAdapter(),
  setMode: (value) => GM_setValue(THEME_STORAGE_KEY, value),
};

const homeWidthSettings = {
  getMode: (defaultValue) => GM_getValue(HOME_WIDTH_STORAGE_KEY, defaultValue),
  menu: createMenuAdapter(),
  setMode: (value) => GM_setValue(HOME_WIDTH_STORAGE_KEY, value),
};

const homeComposerSettings = {
  getPreference: (defaultValue) => GM_getValue(HOME_COMPOSER_STORAGE_KEY, defaultValue),
  menu: createMenuAdapter(),
  setPreference: (value) => GM_setValue(HOME_COMPOSER_STORAGE_KEY, value),
};

const telemetryBlockerSettings = {
  getPreference: (defaultValue) => GM_getValue(TELEMETRY_BLOCKER_STORAGE_KEY, defaultValue),
  menu: createMenuAdapter(),
  setPreference: (value) => GM_setValue(TELEMETRY_BLOCKER_STORAGE_KEY, value),
};

const pageWindow = globalThis.unsafeWindow ?? window;
createIdleTimerBlockerFeature(pageWindow).start();
createTelemetryBlockerFeature(pageWindow, telemetryBlockerSettings).start();

startWhenDocumentElementReady(window, () => {
  createPageContextFeature(window).start();
  createThemeFeature(window, themeSettings).start();
  createPageStylesFeature(window, PAGE_STYLE_ENTRIES).start();
  createAnswerActionsStickyFeature(window).start();
  createCommentComposerFeature(window).start();
  createHomeSidebarFeature(window, userscriptSettings).start();
  createHomeWidthFeature(window, homeWidthSettings).start();
  createHomeComposerFeature(window, homeComposerSettings).start();
});
