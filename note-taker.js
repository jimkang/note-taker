var restify = require('restify');
var fs = require('fs');
var sb = require('standard-bail')();
var defaults = require('lodash.defaults');
var ParseJSON = require('./parse_json');
var callNextTick = require('call-next-tick');

// TODO: secret should be per-archive
function NoteTaker(
  { secret, staticWebStreams, getId },
  done
) {
  var server = restify.createServer({
    name: 'note-taker'
  });

  server.use(restify.CORS());
  server.use(restify.bodyParser());

  server.get('/health', respondOK);

  server.post('/note', postNote);
  server.head(/.*/, respondHead);

  callNextTick(done, null, server);
  
  function respondOK(req, res, next) {
    res.json(200, { message: 'OK!' });
    next();
  }

  function postNote(req, res, next) {
    if (req.headers.authorization !== `Key ${secret}`) {
      res.json(401);
      next();
      return;
    }
    if (!req.headers['x-note-archive']) {
      res.json(400, { message: 'No note archive specified.' });
      next();
      return;
    }

    var archiveName = req.headers['x-note-archive'];

    var webStream = staticWebStreams[archiveName];
    if (!webStream) {
      res.json(404, { message: 'Cannot find archive.' });
      next();
      return;
    }
    if (!req.body) {
      res.json(400, { message: 'You need to provide the body.' });
      next();
      return;
    }

    var id = getId(archiveName);

    webStream.write({
      id,
      date: new Date(req.body.date),
      mediaFilename: req.body.mediaFilename,
      caption: req.body.caption,
      altText: req.body.altText,
      buffer: req.body.buffer, // Probably not going to work
      isVideo: req.body.isVideo
    });
    res.json(201, { message: 'Got it!' });
    next();
  }

  function respondHead(req, res, next) {
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end();
    next();
  }
}

module.exports = NoteTaker;
