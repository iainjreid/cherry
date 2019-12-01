#!/usr/bin/env node

'use strict';

const logo = require('..');

const { name, description } = require(process.cwd() + '/package.json')

if (!(name && description)) {
  console.log('Both name and description are required');
  return;
}

logo(name, description);
