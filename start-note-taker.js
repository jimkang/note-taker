#!/usr/bin/env node

/* global process */

var NoteTaker = require('./note-taker');
var StaticWebArchive = require('@jimkang/static-web-archive');
var logFormat = require('log-format');
var randomId = require('idmaker').randomId;
var configs = require('./configs/config-index');

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
