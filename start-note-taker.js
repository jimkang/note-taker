#!/usr/bin/env node

/* global process */

var NoteTaker = require('./note-taker');
var StaticWebArchive = require('static-web-archive');
var logFormat = require('log-format');
var randomId = require('idmaker').randomId;
var config = require('./config');

const port = 5678;
var deathmtnStream = StaticWebArchive({
  title: 'deathmtn',
  rootPath: config.rootPath,
  maxEntriesPerPage: 25
});
deathmtnStream.on('error', logError);

NoteTaker(
  {
    secret: config.secret,
    staticWebStreams: {
      deathmtn: deathmtnStream
    },
    getId: appendRandomId
  },
  useServer
);

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

