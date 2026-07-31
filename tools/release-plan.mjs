// Decides whether a push to master warrants a release, so the release workflow
// can skip instead of publishing something.
//
// release-it cannot answer this on its own. When the conventional-changelog
// plugin has no recommendation, release-it's Version plugin falls back to a
// CI-default `patch` of the latest version, so a `ci:`-only push would publish,
// and the `chore: release X` commit release-it pushes itself would publish
// again, and again. The bump has to be decided before release-it starts.
//
// The recommendation comes from tools/changelog-preset.mjs, the same type list
// the changelog renders from, so `effect: "changelog"` and `effect: "hidden"`
// types cannot move the version here either. tools/changelog-check.mjs is the
// control for that.
import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";

import { Bumper } from "conventional-recommended-bump";

import preset, { TYPES } from "./changelog-preset.mjs";

/**
 * `semver.inc` for the three release types this can produce. Written out rather
 * than pulled from `semver`, which is only in the tree as a transitive of
 * release-it and would break the moment that changed.
 *
 * @param {string} version
 * @param {string} releaseType
 * @returns {string}
 */
const increment = (version, releaseType) => {
  const [major, minor, patch] = version.split(".").map(Number);
  if ([major, minor, patch].some((part) => !Number.isInteger(part))) {
    throw new Error(`package.json version is not plain x.y.z: ${version}`);
  }
  if (releaseType === "major") return `${major + 1}.0.0`;
  if (releaseType === "minor") return `${major}.${minor + 1}.0`;
  if (releaseType === "patch") return `${major}.${minor}.${patch + 1}`;
  throw new Error(`unexpected release type: ${releaseType}`);
};

/** @param {string[]} args */
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

/**
 * @param {string} name
 * @param {string} value
 */
const output = (name, value) => {
  console.log(`${name}=${value}`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
  }
};

/** @param {string} text */
const summary = (text) => {
  console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`);
  }
};

const { version: current } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

const tag = (() => {
  try {
    return git("describe", "--tags", "--abbrev=0", "--match", "v*");
  } catch {
    return null;
  }
})();

// Same double cast .release-it.mjs needs: the preset publishes
// `createPreset(config?): {}`, so its own type doesn't describe the `whatBump`
// it returns.
const { whatBump } =
  /** @type {{ whatBump: Parameters<Bumper["bump"]>[0] }} */ (
    /** @type {unknown} */ (await preset)
  );

const bumper = new Bumper(process.cwd());
bumper.loadPreset({ name: "conventionalcommits", types: TYPES });
const { releaseType } = /** @type {{ releaseType?: string }} */ (
  await bumper.bump(whatBump)
);

if (!releaseType) {
  output("release", "false");
  summary(
    tag
      ? `Nothing to release. No commit since \`${tag}\` carries a type that bumps the version.`
      : "Nothing to release. No commit carries a type that bumps the version.",
  );
  process.exit(0);
}

const next = increment(current, releaseType);

if (git("tag", "--list", `v${next}`)) {
  // A tag that already exists means a release ran and something after it did
  // not. Publishing over it is not something to guess at.
  summary(`\`v${next}\` already exists. Refusing to release over it.`);
  console.error(`::error::v${next} already exists.`);
  process.exit(1);
}

output("release", "true");
output("version", next);
summary(
  `Releasing \`${current}\` -> \`${next}\` (${releaseType}), from the commits since \`${tag ?? "the first commit"}\`.`,
);
