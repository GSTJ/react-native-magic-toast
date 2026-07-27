import { registerRootComponent } from "expo";

import App from "./App";

// Replaces the `node_modules/expo/AppEntry.js` entry point. In a pnpm
// workspace the hoisted `node_modules` lives at the repo root, so a `main`
// pointing inside `example/node_modules` no longer resolves.
registerRootComponent(App);
