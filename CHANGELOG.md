# Changelog

Generated from conventional commit messages. Breaking changes get their own
heading, from either a `!` after the type or a `BREAKING CHANGE:` footer.

Everything at 1.0.0 and below was backfilled from git history after the fact.
Releases up to 0.3.1 were published with empty notes; the sections here are what
the commits in each range actually say, which for 0.2.2 and 0.3.1 includes
breaking changes that never made it into the published release bodies. The tags
themselves were left alone.

## [1.2.0](https://github.com/GSTJ/react-native-magic-toast/compare/v1.1.0...v1.2.0) (2026-07-31)

### Features

* **toast:** export the Toast building blocks ([#19](https://github.com/GSTJ/react-native-magic-toast/issues/19)) ([c32f15e](https://github.com/GSTJ/react-native-magic-toast/commit/c32f15e408182f701968d457bb1cbc56b85c3243))

## [1.1.0](https://github.com/GSTJ/react-native-magic-toast/compare/v1.0.1...v1.1.0) (2026-07-31)

### Features

* **toast:** move onto magic-modal and pass the handle through ([#18](https://github.com/GSTJ/react-native-magic-toast/issues/18)) ([75338e6](https://github.com/GSTJ/react-native-magic-toast/commit/75338e6eb1e78c33f5906ce05c829d5cb0d631f0))

## [1.0.1](https://github.com/GSTJ/react-native-magic-toast/compare/v1.0.0...v1.0.1) (2026-07-29)

### Bug Fixes

* **build:** keep the tests out of the published tarball ([#16](https://github.com/GSTJ/react-native-magic-toast/issues/16)) ([16c66de](https://github.com/GSTJ/react-native-magic-toast/commit/16c66deafa9fc6852a835aacabdfbb62ea2b1cef))
* **changelog:** write CHANGELOG.md and backfill the history ([#12](https://github.com/GSTJ/react-native-magic-toast/issues/12)) ([da02bd7](https://github.com/GSTJ/react-native-magic-toast/commit/da02bd7beb174e5ac6568cb7009af09c4fb1af44))
* **deps:** bump magic-oxlint-config to 2.0.0 and drop the eslint tree ([#15](https://github.com/GSTJ/react-native-magic-toast/issues/15)) ([d17640f](https://github.com/GSTJ/react-native-magic-toast/commit/d17640f22aeadbdbc0e56d80cda3afe730e946bb))
* **example:** fire the first toast below MagicModalPortal ([9e0b7d5](https://github.com/GSTJ/react-native-magic-toast/commit/9e0b7d591759061e90c5026397abc63711fc8415))
* resolve the oxlint diagnostics the new preset reports ([3f741f4](https://github.com/GSTJ/react-native-magic-toast/commit/3f741f48ee6a8169558393a9b24afa31008bfed2))

### Code Refactoring

* kebab-case filenames ([0dedd82](https://github.com/GSTJ/react-native-magic-toast/commit/0dedd82485c0a2413fbaf3f8a2568731e5bec7b6))
* use type aliases instead of interfaces ([94d877a](https://github.com/GSTJ/react-native-magic-toast/commit/94d877a8e0a7b3827c8ae7f74bdf3083fcb2bbd8))

### Chores

* **config:** drop the workarounds 1.1.0 made unnecessary ([093e79b](https://github.com/GSTJ/react-native-magic-toast/commit/093e79b389cdb47e971700eeea294a2e3813c2c0))
* **config:** wire up oxlint, oxfmt and magic-tsconfig ([ed20226](https://github.com/GSTJ/react-native-magic-toast/commit/ed20226e394fe6ebf862a1256ea7e4d5fa1b0f59))
* **deps:** bump the magic packages to 1.1.0 ([8fbfa76](https://github.com/GSTJ/react-native-magic-toast/commit/8fbfa763cea8d11f28ca7fbd057e1846d6416f5b))
* **deps:** bump the magic packages to 1.2.0 ([0037ba8](https://github.com/GSTJ/react-native-magic-toast/commit/0037ba87c0ff98828375a8006598d85002a375fc))
* **deps:** move to pnpm and swap eslint/prettier for the magic stack ([58b06a7](https://github.com/GSTJ/react-native-magic-toast/commit/58b06a7f9a363cfb196ce2503ed6c70a95ea949d))
* **example:** resolve the library through the workspace link ([#10](https://github.com/GSTJ/react-native-magic-toast/issues/10)) ([6a356bf](https://github.com/GSTJ/react-native-magic-toast/commit/6a356bf699b5a7802a95ced55ce040543dd98747))

### Documentation

* add a security policy ([#13](https://github.com/GSTJ/react-native-magic-toast/issues/13)) ([b773b6f](https://github.com/GSTJ/react-native-magic-toast/commit/b773b6f3f0ba003ca38b75167dab6d73258393a7))
* **oxlint:** stop citing --print-config as the reason for extendConfig ([964168f](https://github.com/GSTJ/react-native-magic-toast/commit/964168fe15248ead4dafc4d3b09ce369002885cf))
* say when MagicModalPortal is ready to take a toast ([ca110d9](https://github.com/GSTJ/react-native-magic-toast/commit/ca110d9502c3bc121a03ba80585a1971d6b4e20c))

## [1.0.0](https://github.com/GSTJ/react-native-magic-toast/compare/v0.4.0...v1.0.0) (2026-07-26)

The toast API itself is unchanged. The break is `react-native-magic-modal`
going 4 -> 7 underneath, which drags the peer floor up with it. The
[v1.0.0 release notes](https://github.com/GSTJ/react-native-magic-toast/releases/tag/v1.0.0)
carry the upgrade guide: the peer version table, the new-architecture and
Reanimated 4 Babel plugin steps, and the return-value shape change on
`magicToast.show()`.

### ⚠ BREAKING CHANGES

* requires react-native-magic-modal v7, react-native >= 0.81,
  react-native-reanimated >= 4, react-native-gesture-handler >= 2.20 and
  react-native-worklets >= 0.5. Apps that can't move yet should stay on 0.4.x.

### Features

* move to react-native-magic-modal v7 ([#5](https://github.com/GSTJ/react-native-magic-toast/issues/5)) ([e42c0ac](https://github.com/GSTJ/react-native-magic-toast/commit/e42c0ac3d46911350da99614167e2d9e0c534816))

### Chores

* **deps:** force uuid to 11.1.1 in both lockfiles ([#7](https://github.com/GSTJ/react-native-magic-toast/issues/7)) ([7e44f77](https://github.com/GSTJ/react-native-magic-toast/commit/7e44f779ae3f896e54cc920dfb474b9066375745))
* **deps:** refresh dev tooling ([#6](https://github.com/GSTJ/react-native-magic-toast/issues/6)) ([961dfde](https://github.com/GSTJ/react-native-magic-toast/commit/961dfde3b1aa6d86bc7cd346d372e0adbde3b4a2))
* release 1.0.0 ([d91f79f](https://github.com/GSTJ/react-native-magic-toast/commit/d91f79f1d9582f3b1aff1b537cbbd3c9866781af))

## [0.4.0](https://github.com/GSTJ/react-native-magic-toast/compare/v0.3.1...v0.4.0) (2026-07-25)

A minor rather than a patch because `react-native-svg` is a hard dependency
here, not a peer, so the ^12.1.1 -> ^15.0.0 move can leave an app pinning svg 12
with a duplicate native module. See the
[v0.4.0 release notes](https://github.com/GSTJ/react-native-magic-toast/releases/tag/v0.4.0).

### Bug Fixes

* **deps:** bump react-native-svg past the nth-check ReDoS ([#3](https://github.com/GSTJ/react-native-magic-toast/issues/3)) ([c33e89f](https://github.com/GSTJ/react-native-magic-toast/commit/c33e89f6629af0f11343ac21e768d8274ada7596))

### Chores

* release 0.4.0 ([#4](https://github.com/GSTJ/react-native-magic-toast/issues/4)) ([485269d](https://github.com/GSTJ/react-native-magic-toast/commit/485269d128d96773b25ad12b8031ec117386552c))

## [0.3.1](https://github.com/GSTJ/react-native-magic-toast/compare/v0.2.2...v0.3.1) (2024-06-08)

### ⚠ BREAKING CHANGES

* use magic modal v4

### Features

* use magic modal v4 ([7a90e18](https://github.com/GSTJ/react-native-magic-toast/commit/7a90e18c8325323b21c0e27460617dc3f2089683))

### Chores

* release 0.3.1 ([a5bd063](https://github.com/GSTJ/react-native-magic-toast/commit/a5bd0630af16acadea7dd0949b7a29a8ba9e31cd))

## [0.2.2](https://github.com/GSTJ/react-native-magic-toast/compare/v0.2.1...v0.2.2) (2024-05-26)

### ⚠ BREAKING CHANGES

* support new react-native-magic-modal version

### Features

* support new react-native-magic-modal version ([4ddcd52](https://github.com/GSTJ/react-native-magic-toast/commit/4ddcd5202e0087faa7a0aa6a6799ff4e46f02ea7))

### Chores

* release 0.2.2 ([3b80f3f](https://github.com/GSTJ/react-native-magic-toast/commit/3b80f3f639b33019fab0d07d85e7059d458d2401))

## [0.2.1](https://github.com/GSTJ/react-native-magic-toast/compare/v0.2.0...v0.2.1) (2023-08-21)

### Bug Fixes

* typescript bindings ([3bf9e1c](https://github.com/GSTJ/react-native-magic-toast/commit/3bf9e1c112b8d1c7a85216d5236a28f939b09053))

### Chores

* release 0.2.1 ([c58904d](https://github.com/GSTJ/react-native-magic-toast/commit/c58904da56aa68a08ebf9c1e3ebd2213fab93f1d))

## [0.2.0](https://github.com/GSTJ/react-native-magic-toast/compare/v0.1.3...v0.2.0) (2023-08-21)

### Features

* add custom 'show' toast and a success toast ([2b9613a](https://github.com/GSTJ/react-native-magic-toast/commit/2b9613a0ee1eb85a419826c92b122f142d4dab92))
* add custom success icon ([807afeb](https://github.com/GSTJ/react-native-magic-toast/commit/807afebdd34bd99fe3a0897021ffabf7a4065d92))
* improve success toast style ([73bb0c5](https://github.com/GSTJ/react-native-magic-toast/commit/73bb0c505590333fba4a90a2a5bd63bc25f3c1fb))
* upgrade expo version on examples ([b4a3f7e](https://github.com/GSTJ/react-native-magic-toast/commit/b4a3f7e10313a3bd9be0427e1906f65a18a1d462))

### Chores

* release 0.2.0 ([bd37ccb](https://github.com/GSTJ/react-native-magic-toast/commit/bd37ccb6ed97400491f59d3ce22a198c1e69f50d))

### Documentation

* update readme.md ([760d8ce](https://github.com/GSTJ/react-native-magic-toast/commit/760d8ce0b6a8233534abfeffbe6bdbb40e2ba9d2))
* update readme.md ([63eb743](https://github.com/GSTJ/react-native-magic-toast/commit/63eb7439de44ebdd1000e036fdf8749e0d3e963b))
* update README.md ([48a59a2](https://github.com/GSTJ/react-native-magic-toast/commit/48a59a29c3218b838a36e93ec7ac25a2956576f2))

## [0.1.3](https://github.com/GSTJ/react-native-magic-toast/compare/v0.1.2...v0.1.3) (2022-02-22)

### Chores

* release 0.1.3 ([51ec837](https://github.com/GSTJ/react-native-magic-toast/commit/51ec837c2a123d3f3544db2acd98f03125c999f4))

### Documentation

* update usage and installation instructions ([fba8be0](https://github.com/GSTJ/react-native-magic-toast/commit/fba8be061693081a1aa763728bd161d3cc0fc3f6))

## [0.1.2](https://github.com/GSTJ/react-native-magic-toast/compare/v0.1.1...v0.1.2) (2022-02-22)

### Chores

* release 0.1.2 ([ad72c89](https://github.com/GSTJ/react-native-magic-toast/commit/ad72c89c1bcebd9d1786d88e27cf5853d63f11d8))

### Documentation

* update usage and installation instructions ([36d3691](https://github.com/GSTJ/react-native-magic-toast/commit/36d369139f933205d79a61f60ce337ccbed2adbf))

## [0.1.1](https://github.com/GSTJ/react-native-magic-toast/compare/1ee5edb20cc93e99806b840a54b6aee6c7902d1b...v0.1.1) (2022-02-22)

### Chores

* initial commit ([91fcb9c](https://github.com/GSTJ/react-native-magic-toast/commit/91fcb9ccccedc288f4e5ef26007e063fd70c74be))
* initial commit ([1ee5edb](https://github.com/GSTJ/react-native-magic-toast/commit/1ee5edb20cc93e99806b840a54b6aee6c7902d1b))
* release 0.1.1 ([160b1cd](https://github.com/GSTJ/react-native-magic-toast/commit/160b1cd82309c8007ac5b57fb9d180bc3d701ad7))

### Documentation

* update readme.md ([abd73e6](https://github.com/GSTJ/react-native-magic-toast/commit/abd73e6f582193778a3af84306f907f52cbe7789))
