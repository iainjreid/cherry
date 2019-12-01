#!/usr/bin/env node

'use strict';

const cherry = require('../src/main');

const { name, description } = require(process.cwd() + '/package.json')

if (!(name && description)) {
  console.log('Both name and description are required');
  return;
}

cherry(name, description);
