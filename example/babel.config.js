module.exports = function (api) {
  api.cache(true);

  // The example depends on the library as `workspace:*`, so pnpm links it into
  // `example/node_modules`. Metro then reads the root `package.json`, whose
  // `react-native` field already points at `src`. That is what the
  // `module-resolver` alias used to do by hand.
  return {
    presets: ["babel-preset-expo"],
  };
};
