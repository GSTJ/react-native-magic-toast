const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

// Standard Expo monorepo setup: watch the whole workspace, and resolve modules
// from the example's own `node_modules` first and the hoisted root one second.
// The previous blockList/extraNodeModules dance existed to stop two copies of
// each peer dependency being loaded; the pnpm workspace installs one copy.
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
