import reactNative from "magic-oxlint-config/react-native";
import { defineConfig, type OxlintConfig } from "oxlint";

export default defineConfig({
  // The cast is a workaround, not a preference. `magic-oxlint-config@1.0.0`
  // types `overrides[].plugins` as `string[]`, while oxlint 1.75.0 narrows
  // `OxlintOverride["plugins"]` to a union of known plugin names, so the
  // README's `extends: [reactNative]` fails `tsc --noEmit` with TS2322. The
  // objects are structurally fine at runtime — oxlint loads this config and
  // reports the preset's rules. Drop the cast once the package's exported
  // types line up with oxlint's.
  extends: [reactNative as OxlintConfig],
  // Required: oxlint does not inherit `ignorePatterns` through `extends`.
  ignorePatterns: [...(reactNative.ignorePatterns ?? []), "**/lib/**"],
});
