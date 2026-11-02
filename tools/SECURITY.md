# Development dependency security

The library publishes compiled code and peer dependency requirements. Expo,
Jest, release-it and their transitive dependencies belong to development and
the example app. These fixes use `chore(deps)` and do not publish a library
version. `chore(security)` remains reserved for a security change consumers
need to receive. The release planner, changelog preset and annotated tag
configuration keep the existing breaking-change controls.

## Compatibility and migration

- basic-ftp moves from 5.3.1 to 6.2.1 for GHSA-c475-qrg2-pj4r.
  get-uri uses its named Client export, access, lastMod, list, downloadTo and
  close APIs. These remain available. The directory-listing parser is tested.
- Zod moves from 3.25.76 to 4.6.6 for GHSA-mrhx-c7xc-m3w5.
  The installed Expo CLI only uses Zod in its plugin and MCP schema modules.
  Tests import those modules and check accepted and rejected payloads.
  Zod 4 changes error formatting and stops parsing oversized constrained
  collections before visiting their elements. Tooling that reads Zod 3 error
  internals must migrate to Zod 4's issue API. No library public type uses Zod.
- Modern glob moves from 13.0.6 to 14.0.2 for GHSA-3g3m-2fjr-6pw4.
  Modern minimatch moves from 10.2.5 to 11.0.1 for
  GHSA-g3hv-75wg-m249. Their named exports and glob's async/sync operations
  remain in use. Pattern optimization now stops expanding at its configured
  limit and skips pairwise deduplication for large sets. Legacy glob 7 and
  minimatch 3 retain their callable CommonJS API for Jest and React Native.
  Node 24, already required by this repository, meets the new tool requirements.
- deepmerge's advertised 4.3.2 fix remains unpublished (the registry's latest
  version is 4.3.1). The local patch writes destination properties with
  Object.defineProperty, including during target cloning, instead of invoking
  an inherited setter. Own enumerable properties, symbols, nested objects and
  array merging retain their behavior. CommonJS, UMD and source entry points
  receive the same patch. Remove it once a published fix passes these checks.

## Audit gate

Run `pnpm run test:security`. CI runs this alongside the full test suite,
build, lint, formatting, types and changelog controls. Attack inputs execute
in a subprocess with a timeout. The audit gate reads the registry report and
fails on every advisory except these exact, tested cases:

- GHSA-gcqx-w48m-w2h4 on deepmerge 4.3.1: pnpm's audit inspects the published
  version rather than the patched files. Target, source and nested poisoning
  regressions must pass before the audit exception is considered.
- GHSA-g3hv-75wg-m249 on minimatch 3.1.5: the upstream advisory concerns
  firstPhasePreProcess at optimizationLevel 2. Version 3 has no such phase.
  The gate checks its exact version and missing phase, matches a normal glob,
  and constructs the attack pattern under the timeout. Modern minimatch uses
  the published fix and a bounded expansion regression.

No new audit ignores are added to pnpm-workspace.yaml. Raw `pnpm audit` still
reports these two version-based findings. The existing image-size advisory
exceptions retain their parser timeout controls.

The 14-day quarantine remains enabled. Only exact security update versions
and the two required glob/minimatch transitive versions receive exceptions.

Upstream references:

- https://github.com/advisories/GHSA-c475-qrg2-pj4r
- https://github.com/colinhacks/zod/commit/a0ebf970f2d752e5f58527cd2942ff48be4f46bd
- https://github.com/isaacs/minimatch/commit/77a0f5c4b80bdc641c3c930a1d9edf5ad2db57f8
- https://github.com/advisories/GHSA-3g3m-2fjr-6pw4
- https://github.com/advisories/GHSA-gcqx-w48m-w2h4
