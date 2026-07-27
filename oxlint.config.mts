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
});
