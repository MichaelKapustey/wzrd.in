'use strict';

const tap = require('tap');

const Builder = require('../builder');

let builder;
tap.test('Builder constructor', (t) => {
  t.doesNotThrow(() => {
    builder = new Builder();
  }, 'constructs successfully');
  t.end();
});

tap.test('builder.init', (t) => {
  builder.init().then((result) => {
    t.end();
  }).catch((err) => {
    t.fail(err, 'did not successfully init');
    t.end();
  });
});

tap.test('builder._build creates a bundle -- standalone concat-stream', (t) => {
  builder.build({
    module_name: 'concat-stream',
    module_version: '1.5.2',
    standalone: true
  }).then((results) => {
    t.ok(results);
    results = results || {};

    t.equal(results.code, 0, 'exit code is 0');

    t.ok(results.debug, 'debug block is defined');
    let debug = results.debug || {};

    t.equal(debug.module_scope, '', 'module_scope is blank');
    t.equal(debug.module_name, 'concat-stream', 'module_name is concat-stream');
    t.equal(debug.module_version, '1.5.2', 'module_version is 1.5.2');
    t.equal(debug.module_subfile, '', 'module_subfile is blank');
    t.equal(debug.standalone, true, 'standalone is true');
    t.equal(debug.debug, false, 'debug is false');
    t.equal(debug.full_paths, false, 'full_paths is false');

    t.type(results.logs, 'string', 'logs are a string');

    t.ok(results.pkg, 'pkg block is defined');
    let pkg = results.pkg || {};

    t.type(pkg.readme, 'string', 'readme is a string');
    t.ok(pkg.readme.length, 'readme has length');

    t.ok(results.bundle, 'bundle is defined');
    let bundle = results.bundle || '';
    t.ok(results.bundle.length, 'bundle has length');

    t.end();
    
  }).catch((err) => {
    t.fail(err);
    t.end();
  });
});