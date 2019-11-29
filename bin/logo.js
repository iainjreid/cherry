#!/usr/bin/env node

const logo = require("..");

const name = process.argv[2];

if (!name) {
  console.log("Please provide a name");
  return;
}

logo(name);
