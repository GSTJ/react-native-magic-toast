// Moved out of package.json so the changelog policy can live in one place.
// tools/changelog-preset.mjs owns the type list; this file and
// tools/changelog-check.mjs both read it, so the check can't pass against a
// list the release doesn't use.
import { TYPES } from "./tools/changelog-preset.mjs";

// The preamble at the top of CHANGELOG.md. The plugin strips this exact string
// out of the existing file before prepending the new section, so anything you
// want to stay above the newest release has to be in here rather than typed
// into CHANGELOG.md by hand — text in the file that isn't in this string gets
// pushed underneath the next release.
const header = `# Changelog

Generated from conventional commit messages. Breaking changes get their own
heading, from either a \`!\` after the type or a \`BREAKING CHANGE:\` footer.

Everything at 1.0.0 and below was backfilled from git history after the fact.
Releases up to 0.3.1 were published with empty notes; the sections here are what
the commits in each range actually say, which for 0.2.2 and 0.3.1 includes
breaking changes that never made it into the published release bodies. The tags
themselves were left alone.`;

const config = {
  plugins: {
    "@release-it/conventional-changelog": {
      // Without this the changelog was generated for the release body and
      // thrown away — nine releases and no CHANGELOG.md in the repo. The plugin
      // prepends, so everything already in the file stays exactly as it is.
      infile: "CHANGELOG.md",
      header,
      preset: {
        name: "conventionalcommits",
        types: TYPES,
      },
    },
  },
  git: {
    commitMessage: "chore: release ${version}",
    tagName: "v${version}",
    // Annotate the tag with the same section the changelog and the GitHub
    // release get. `git show v1.0.1` then tells you what shipped instead of
    // "Release 1.0.1", and the three places a reader might look can't disagree.
    tagAnnotation: "${changelog}",
    // git's default tag cleanup is `strip`, which deletes every line starting
    // with `#` — that is every `### Bug Fixes` heading and the `## [1.0.1]`
    // title, leaving a tag message of unlabelled bullets. Measured on a
    // rehearsal, not assumed.
    tagArgs: ["--cleanup=verbatim"],
  },
  npm: {
    publish: true,
  },
  github: {
    release: true,
  },
};

export default config;
