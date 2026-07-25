const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const escape = require('escape-string-regexp');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

const config = getDefaultConfig(__dirname);

config.projectRoot = __dirname;
config.watchFolders = [root];

// We need to make sure that only one version is loaded for peerDependencies
// So we block them at the root, and alias them to the versions in example's node_modules
config.resolver.blockList = [
  ...[config.resolver.blockList ?? []].flat(),
  ...modules.map(
    (m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
  ),
];

config.resolver.extraNodeModules = [
  ...modules,
  // The library source lives outside the example's projectRoot, so metro has to
  // be told where react-native-web is when bundling for web.
  'react-native-web',
].reduce((acc, name) => {
  acc[name] = path.join(__dirname, 'node_modules', name);
  return acc;
}, {});

module.exports = config;
