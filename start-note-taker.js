#!/usr/bin/env node

/* global process */

var fs = require('fs');
var NoteTaker = require('./note-taker');
var StaticWebArchive = require('@jimkang/static-web-archive');
var logFormat = require('log-format');
var randomId = require('idmaker').randomId;

if (process.argv.length < 3) {
  console.error(
    'Usage: node start-note-taker.js <path to directory containing configs>'
  );
  process.exit(1);
}

const fullConfigsPath = process.argv[2];

var files = fs.readdirSync(fullConfigsPath).filter(isAConfigFile);
var configs = files.map(file => require(fullConfigsPath + '/' + file));

const port = 5678;

NoteTaker(
  {
    archiveKits: configs.map(createArchiveKit),
    getId: appendRandomId
  },
  useServer
);

function createArchiveKit(config) {
  var archiveStream = StaticWebArchive(config.archiveOpts);
  archiveStream.on('error', logError);
  return {
    name: config.name,
    archiveStream,
    secret: config.secret
  };
}

function useServer(error, server) {
  if (error) {
    process.stderr.write(logFormat(error.message, error.stack));
    process.exit(1);
    return;
  }

  server.listen(port, onReady);

  function onReady(error) {
    if (error) {
      logError(error);
    } else {
      process.stdout.write(logFormat(server.name, 'listening at', server.url));
    }
  }
}

function appendRandomId(archiveName) {
  return archiveName + '-' + randomId(8);
}

function logError(error) {
  process.stderr.write(logFormat(error.message, error.stack));
}

function isAConfigFile(filename) {
  return filename.endsWith('-config.js');
}
