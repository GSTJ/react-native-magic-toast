import { extendConfig } from "magic-oxlint-config";
import reactNative from "magic-oxlint-config/react-native";

// `extendConfig` flattens the preset and this object into a single config
// instead of going through oxlint's `extends`, which drops the preset's
// `ignorePatterns` — the local array replaces it rather than adding to it, and
// oxlint has no per-override ignore to defend it with. Flattened, there is
// nothing to re-declare by hand.
export default extendConfig(reactNative, {
  // react-native-builder-bob's output directory, so it only applies here.
  ignorePatterns: ["**/lib/**"],
  overrides: [
    {
      // tools/ holds the changelog CLI. Printing to the terminal is what it is
      // for — the CI job reads its output.
      files: ["tools/**"],
      rules: { "no-console": "off" },
    },
    {
      // release-it's own config. `${version}` and `${changelog}` are release-it
      // placeholders, resolved by its `format()` at release time, so they have
      // to reach it as literal text rather than as template literals.
      files: [".release-it.mjs"],
      rules: {
        "no-template-curly-in-string": "off",
      },
    },
  ],
});
