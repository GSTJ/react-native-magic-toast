const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { createRequire } = require("node:module");
const { readFileSync } = require("node:fs");

// Run attack inputs in a separate process so a regression fails within a bound.
if (process.argv.includes("--child")) {
  (async () => {
    const merge = require("deepmerge");
    for (const entry of ["deepmerge", "deepmerge/dist/umd.js"]) {
      const fn = require(entry);
      const poison = JSON.parse('{"__proto__":{"polluted":true}}');
      for (const result of [
        fn(poison, {}),
        fn(Object.create(null), poison),
        fn({}, { nested: poison }).nested,
      ]) {
        assert.equal(Object.getPrototypeOf(result), Object.prototype);
        assert.equal(result.polluted, undefined);
      }
    }
    const symbol = Symbol("key");
    assert.deepEqual(
      merge({ a: [1], b: { x: 1 }, [symbol]: 1 }, { a: [2], b: { y: 2 } }),
      { a: [1, 2], b: { x: 1, y: 2 }, [symbol]: 1 },
    );
    console.log(
      "PASS deepmerge target/source/nested prototype poisoning and ordinary merges",
    );

    // Upstream 1.4.3 regression vectors, bounded by the parent timeout.
    const forge = require("node-forge");
    assert.equal(require("node-forge/package.json").version, "1.4.3");
    const identity = Buffer.concat([Buffer.from([1]), Buffer.alloc(31)]);
    const signature = Buffer.concat([identity, Buffer.alloc(32)]);
    for (const message of ["", "hello", "admin=true"]) {
      assert.equal(
        forge.ed25519.verify({
          message,
          encoding: "utf8",
          signature,
          publicKey: identity,
        }),
        false,
      );
    }
    const keys = forge.ed25519.generateKeyPair({ seed: Buffer.alloc(32, 7) });
    const signed = forge.ed25519.sign({
      message: "valid",
      encoding: "utf8",
      privateKey: keys.privateKey,
    });
    assert.equal(
      forge.ed25519.verify({
        message: "valid",
        encoding: "utf8",
        signature: signed,
        publicKey: keys.publicKey,
      }),
      true,
    );
    const certificates = require("@expo/code-signing-certificates");
    const keyPair = certificates.generateKeyPair();
    const certificate = certificates.generateSelfSignedCodeSigningCertificate({
      keyPair,
      validityNotBefore: new Date("2026-01-01"),
      validityNotAfter: new Date("2027-01-01"),
      commonName: "local-security-test",
    });
    certificates.validateSelfSignedCertificate(certificate, keyPair);
    assert.equal(
      typeof certificates.signBufferRSASHA256AndVerify(
        keyPair.privateKey,
        certificate,
        Buffer.from("certificate regression"),
      ),
      "string",
    );
    const errors = [];
    const connection = () =>
      forge.tls.createConnection({
        server: false,
        connected() {},
        tlsDataReady() {},
        dataReady() {},
        closed() {},
        error(_client, error) {
          errors.push(error);
        },
      });
    const closed = connection();
    closed.handshake();
    closed.process(Buffer.from("15030100020100", "hex").toString("binary"));
    assert.equal(closed.session, null);
    closed.process(Buffer.from("160301000402000000", "hex").toString("binary"));
    const client = connection();
    client.handshake();
    const hello = forge.util.createBuffer();
    hello.putBytes(`\u0003\u0001${"r".repeat(32)}\u0000\u0000/\u00FF`);
    const handshake = forge.util.createBuffer();
    handshake.putByte(2);
    handshake.putInt24(hello.length());
    handshake.putBytes(hello.getBytes());
    const record = forge.util.createBuffer();
    record.putBytes("\u0016\u0003\u0001");
    record.putInt16(handshake.length());
    record.putBytes(handshake.getBytes());
    client.process(record.getBytes());
    assert.ok(
      errors.some(
        (error) => error.message === "Unsupported compression method.",
      ),
    );
    require("node-forge/lib/http");
    const whitespace = "\t ".repeat(256 * 1024);
    const response = forge.http.createResponse();
    assert.equal(
      response.readHeader(
        forge.util.createBuffer(
          `HTTP/1.1 200 OK\r\nX-Test: a${whitespace}b${
            whitespace
          }\r\nSet-Cookie: a=b${whitespace}c; path=/\r\n\r\n`,
        ),
      ),
      true,
    );
    assert.equal(response.getField("X-Test"), `a${whitespace}b`);
    assert.equal(response.getCookies()[0].value, `b${whitespace}c`);
    console.log(
      "PASS node-forge forged signatures, valid signing, TLS crash inputs and bounded HTTP trimming",
    );

    const { z } = require("zod");
    let parsed = 0;
    const item = z.string().refine(() => ++parsed);
    const asyncResults = [];
    for (const schema of [
      z.array(item).max(2),
      z.array(item).length(2),
      z.set(item).max(2),
    ]) {
      const input =
        schema instanceof z.ZodSet ? new Set(["a", "b", "c"]) : ["a", "b", "c"];
      assert.equal(schema.safeParse(input).success, false);
      asyncResults.push(schema.safeParseAsync(input));
    }
    const results = await Promise.all(asyncResults);
    for (const result of results) assert.equal(result.success, false);
    assert.equal(parsed, 0);
    const cli = createRequire(require.resolve("@expo/cli/package.json"));
    const { PluginSchema, DevToolsPluginOutputSchema } = cli(
      "./build/src/start/server/DevToolsPlugin.schema.js",
    );
    const { createMCPDevToolsExtensionSchema } = cli(
      "./build/src/start/server/createMCPDevToolsExtensionSchema.js",
    );
    const plugin = PluginSchema.parse({
      packageName: "test",
      packageRoot: "/tmp",
      cliExtensions: {
        description: "test",
        entryPoint: "index.js",
        commands: [
          {
            name: "run",
            title: "Run",
            environments: ["cli", "mcp"],
            parameters: [{ name: "count", type: "number" }],
          },
        ],
      },
    });
    const schema = createMCPDevToolsExtensionSchema(plugin);
    assert.deepEqual(schema.parse({ command: "run", count: 2 }), {
      command: "run",
      count: 2,
    });
    assert.equal(schema.safeParse({ command: "other" }).success, false);
    assert.equal(
      schema.safeParse({ command: "run", count: "bad" }).success,
      false,
    );
    assert.equal(PluginSchema.safeParse({}).success, false);
    DevToolsPluginOutputSchema.parse([
      { type: "text", text: "ok", level: "info" },
      { type: "image", url: "https://example.com/image.png" },
    ]);
    console.log(
      "PASS Zod collection bounds, async checks and real Expo plugin/MCP schemas",
    );

    const { Minimatch } = require("minimatch");
    const pattern = Array.from({ length: 30 }, () => "**/../a/b").join("/");
    assert.equal(
      new Minimatch(pattern, { optimizationLevel: 2, braceExpandMax: 64 }).set
        .length,
      64,
    );
    const legacyRequire = createRequire(require.resolve("glob/package.json"));
    const legacy = legacyRequire("minimatch");
    assert.equal(legacyRequire("minimatch/package.json").version, "3.1.5");
    assert.equal(legacy.Minimatch.prototype.firstPhasePreProcess, undefined);
    assert.equal(legacy("a/b.js", "**/*.js"), true);
    const legacyPattern = new legacy.Minimatch(pattern, {
      optimizationLevel: 2,
    });
    assert.ok(legacyPattern.set.length > 0);
    console.log(
      "PASS modern minimatch expansion limit; legacy v3 has no vulnerable optimization phase",
    );

    const bob = createRequire(
      require.resolve("react-native-builder-bob/package.json"),
    );
    const modernGlob = bob("glob");
    assert.equal(bob("glob/package.json").version, "14.0.2");
    const files = await modernGlob.glob("src/index.tsx");
    assert.deepEqual(files.sort(), ["src/index.tsx"]);
    assert.deepEqual(modernGlob.globSync("src/index.tsx"), ["src/index.tsx"]);
    const ftp = require("basic-ftp");
    assert.equal(typeof new ftp.Client().downloadTo, "function");
    const listing = ftp.parseList(
      "-rw-r--r-- 1 owner group 12 Jan 01 2026 file.txt",
    );
    assert.equal(listing[0].name, "file.txt");
    assert.equal(listing[0].size, 12);
    console.log(
      "PASS glob async/sync and basic-ftp Client/listing compatibility",
    );
    // The scanner cannot see patched bytes and applies a v10-only advisory to v3.
    // Never suppress another package/version under either advisory.
    if (process.argv.includes("--audit")) {
      const audit = spawnSync("pnpm", ["audit", "--json"], {
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
      });
      assert.ifError(audit.error);
      assert.ok(audit.status === 0 || audit.status === 1);
      const report = JSON.parse(audit.stdout);
      assert.ok(report.advisories);
      for (const finding of Object.values(report.advisories)) {
        const expected = {
          "GHSA-gcqx-w48m-w2h4": ["deepmerge", "4.3.1"],
          "GHSA-g3hv-75wg-m249": ["minimatch", "3.1.5"],
        }[finding.github_advisory_id];
        assert.ok(
          expected,
          `Unmitigated advisory: ${finding.github_advisory_id}`,
        );
        assert.equal(finding.module_name, expected[0]);
        for (const path of finding.findings)
          assert.equal(path.version, expected[1]);
      }
      const config = readFileSync("pnpm-workspace.yaml", "utf8");
      assert.ok(
        config.includes("deepmerge@4.3.1: patches/deepmerge@4.3.1.patch"),
      );
      console.log(
        "PASS audit: only exact tested patch/nonaffected legacy findings remain",
      );
    }
  })().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
} else {
  const result = spawnSync(
    process.execPath,
    [__filename, "--child", ...process.argv.slice(2)],
    {
      encoding: "utf8",
      timeout: 15000,
      maxBuffer: 1024 * 1024,
    },
  );
  process.stdout.write(result.stdout || "");
  process.stderr.write(result.stderr || "");
  assert.ifError(result.error);
  assert.equal(result.status, 0);
}
