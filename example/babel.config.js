module.exports = function (api) {
  api.cache(true);

  // The example imports the library by name and gets `../src`, so an edit shows
  // up on the next reload without a build. That comes from the `paths` entry in
  // `tsconfig.json`, which Expo's Metro config reads and applies before it looks
  // in `node_modules` — measured by dropping the entry and watching resolution
  // move to `lib/module/index.js`. It is what the `module-resolver` alias used
  // to do by hand.
  return {
    presets: ["babel-preset-expo"],
  };
};
