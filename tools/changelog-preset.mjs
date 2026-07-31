// conventionalcommits preset, retuned so the changelog lists what actually
// ships.
//
// The stock preset renders feat, fix, perf and reverts and hides everything
// else, which is wrong for a package that publishes compiled output. A
// `refactor:` in `src/` is a rewrite of every file in `lib/`. A `chore(deps):`
// moves the dependency tree a consumer installs. Hiding those leaves releases
// that changed the tarball described by an empty section.
//
// The split is by whether a type can change what npm hands a consumer:
//
//   renders   feat fix perf revert   the stock set
//             build                  bob's targets and tsconfig.build.json
//                                    decide what lands in lib/
//             refactor               rewrites src/, and lib/ is compiled from it
//             chore                  dependency and config moves ship
//             docs                   README.md is inside the tarball
//
//   hidden    ci                     .github/ is not in `files`
//             style                  oxfmt reaches lib/ through src/, but only
//                                    its whitespace — nothing a consumer can
//                                    observe at runtime or in types
//             test                   bob's `exclude` keeps tests out of lib/
//
// `effect: "changelog"` is the important part: it renders the type without
// letting it drive the version bump, so a pile of `build:` commits still adds
// up to a patch. Only the `bump` types can raise that, exactly as before.
//
// Breaking changes are not configurable here and do not need to be. The
// preset's writer sets `discard = false` the moment a commit carries a note, so
// a `BREAKING CHANGE:` footer or a `!` renders its own section whatever type it
// hangs off, including the hidden ones. tools/changelog-check.mjs is the
// positive control for that.
import createPreset from "conventional-changelog-conventionalcommits";

/** @type {import("conventional-changelog-conventionalcommits").CommitType[]} */
export const TYPES = [
  { type: "feat", section: "Features", effect: "bump" },
  { type: "feature", section: "Features", effect: "bump" },
  { type: "fix", section: "Bug Fixes", effect: "bump" },
  { type: "perf", section: "Performance Improvements", effect: "bump" },
  { type: "revert", section: "Reverts", effect: "bump" },
  { type: "build", section: "Build System", effect: "changelog" },
  { type: "refactor", section: "Code Refactoring", effect: "changelog" },
  { type: "chore", section: "Chores", effect: "changelog" },
  { type: "docs", section: "Documentation", effect: "changelog" },
  { type: "ci", section: "Continuous Integration", effect: "hidden" },
  { type: "style", section: "Styles", effect: "hidden" },
  { type: "test", section: "Tests", effect: "hidden" },
];

export default createPreset({ types: TYPES });
