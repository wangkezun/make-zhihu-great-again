import { describe, expect, it } from "vitest";

import * as sharedStyles from "../src/styles/shared-components.js";
import * as actionStyles from "../src/styles/shared/actions.js";
import * as contentStyles from "../src/styles/shared/content.js";
import * as feedbackStyles from "../src/styles/shared/feedback.js";
import * as surfaceStyles from "../src/styles/shared/surfaces.js";

const semanticModules = [actionStyles, contentStyles, feedbackStyles, surfaceStyles];

describe("shared style modules", () => {
  it("exposes every semantic module through the compatibility entry", () => {
    const semanticExports = semanticModules.flatMap(Object.keys);

    expect(new Set(semanticExports).size).toBe(semanticExports.length);
    expect(Object.keys(sharedStyles).sort()).toEqual([...semanticExports].sort());
  });

  it("keeps semantic aliases referentially stable", () => {
    expect(actionStyles.CONTENT_MORE_ACTIVE_STYLE).toBe(actionStyles.SOFT_PRIMARY_STATE_STYLE);
    expect(actionStyles.FOLLOWING_BUTTON_STYLE).toBe(actionStyles.RAISED_MUTED_CONTROL_STYLE);
    expect(actionStyles.FOLLOWING_BUTTON_DANGER_STYLE).toBe(actionStyles.DANGER_CONTROL_STYLE);
  });
});
