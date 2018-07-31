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
  homeLink: 'https://smidgeo.com/notes/deathmtn',
  rootPath: config.rootPath + '/deathmtn',
  maxEntriesPerPage: 25,
  footerHTML: `<footer>
  <div>
    Good reads on clean web pages:
    <ul>
    <li><a href="http://blog.beaugunderson.com/">Beau's thoughts</a></li>
    <li><a href="http://plastic-idolatry.com/erik/timeline.html">Erik's timeline</a></li>
    <li><a href="https://avoision.com/blog/">Avoision</a></li>
    </ul>
  </div>
  <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
  </div>
  <div>
    <a href="https://smidgeo.com/notes/deathmtn/rss/index.rss">RSS feed</a>
  </div>
  <div>
    <a href="mailto:jimkang+notes@gmail.com">jimkang@gmail.com</a>
  </div>
  </footer>
  `,
  generateRSS: true,
  archiveBaseURL: 'https://smidgeo.com/notes/deathmtn',
  rssFeedOpts: {
    feed_url: 'https://smidgeo.com/notes/deathmtn/rss/index.rss',
    site_url: 'https://smidgeo.com/notes/deathmtn/'
  }
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
