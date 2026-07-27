import { extendConfig } from "magic-oxlint-config";
import reactNative from "magic-oxlint-config/react-native";

// `extendConfig` flattens the preset and this object into a single config
// instead of going through oxlint's `extends`, which still drops
// `ignorePatterns` on 1.75.0. `--print-config` reports `"ignorePatterns": []`
// for `defineConfig({ extends: [reactNative] })`. Flattened, there is nothing
// to re-declare by hand.
export default extendConfig(reactNative, {
  // react-native-builder-bob's output directory, so it only applies here.
  ignorePatterns: ["**/lib/**"],
});
