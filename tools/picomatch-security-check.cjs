const assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const { spawnSync } = require("node:child_process");
const { createHash } = require("node:crypto");
const { readFileSync, readdirSync, realpathSync } = require("node:fs");
const { join, resolve } = require("node:path");

// Check the hoisted installation, including nested copies used by Jest/Metro.
const hashes = {
  "2.3.2": "f4a124a0d95e1349c8533bf9de96e27b1020a774e7665d80ea35432dac4b6203",
  "4.0.5": "b69bf0e302f8f907f360b12ed2f26d99e1c0f5d6622db5442417f958395cb596",
};
const entries = new Set();
const visit = (directory) => {
  for (const item of readdirSync(directory, { withFileTypes: true }).filter(
    (entry) => entry.isDirectory(),
  )) {
    const path = join(directory, item.name);
    if (item.name === "picomatch") {
      const manifest = join(path, "package.json");
      const { version } = JSON.parse(readFileSync(manifest));
      assert.ok(hashes[version], `unverified picomatch version ${version}`);
      const parser = readFileSync(join(path, "lib/parse.js"));
      assert.equal(
        createHash("sha256").update(parser).digest("hex"),
        hashes[version],
        `unpatched parser: ${path}`,
      );
      const entry = require.resolve(path);
      entries.add(realpathSync(entry));
    }
    visit(path);
  }
};
visit(resolve("node_modules"));
assert.ok(entries.size > 0, "missing picomatch installation");
for (const entry of entries) {
  const probe = spawnSync(
    process.execPath,
    [
      "-e",
      `
    const p = require(${JSON.stringify(entry)});
    const a = require('node:assert/strict');
    for (const glob of ['+(*)', '+(*a)', '*(*)', '*(*a)', '+(?*)', '+(@(*a))', '+(@(*))', '+(@(a*))']) {
      const match = p(glob + 'b');
      a.equal(match('a'.repeat(48) + 'c'), false);
      a.equal(match(glob + 'b'), true);
    }
    a.equal(p('+(*(a))')('aaaa'), true);
    a.equal(p('+(a|b)')('abba'), true);
    a.equal(p('+([ab])')('abba'), true);
    a.equal(p('src/**/*.ts')('src/a/b.ts'), true);
  `,
    ],
    { timeout: 3000, encoding: "utf8" },
  );
  assert.equal(probe.status, 0, probe.stderr || String(probe.error));
}
console.log(
  `PASS picomatch: ${entries.size} parser hashes, 3s attack bounds and ordinary glob compatibility`,
);
const resolveDependency = (entry, name) => {
  const localRequire = createRequire(entry);
  try {
    return localRequire.resolve(name);
  } catch {
    return localRequire.resolve(`${name}/package.json`);
  }
};
const verifyPath = (path, version) => {
  let entry = require.resolve("../package.json");
  for (const name of path.split(">").slice(1))
    entry = resolveDependency(entry, name);
  assert.ok(entries.has(realpathSync(entry)), `unverified audit path: ${path}`);
  assert.equal(createRequire(entry)("./package.json").version, version);
};
module.exports = (finding) => {
  assert.equal(finding.module_name, "picomatch");
  assert.ok(finding.findings.length > 0);
  for (const installed of finding.findings) {
    assert.ok(Object.hasOwn(hashes, installed.version));
    assert.ok(installed.paths.length > 0);
    for (const path of installed.paths) verifyPath(path, installed.version);
  }
};
