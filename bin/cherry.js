#!/usr/bin/env node

'use strict';

const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .config((() => {
      try {
        return require(require.resolve('package.json', { paths: [ './', '../' ] }));
      } catch (err) {
        return {};
      }
    })())
    .option('name', {
      alias: 'n',
      describe: "the name of your package",
      type: 'string',
    })
    .option('description', {
      alias: 'd',
      describe: "a short description of your package",
      type: 'string',
    })
    .argv;


const { name, description } = argv;

if (!(name && description)) {
  console.log('Both name and description are required');
  return;
}

require('../src/main')(name, description);
