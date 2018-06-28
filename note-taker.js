/* global Buffer */
var restify = require('restify');
var callNextTick = require('call-next-tick');
var pick = require('lodash.pick');

// TODO: secret should be per-archive
function NoteTaker({ secret, staticWebStreams, getId }, done) {
  var server = restify.createServer({
    name: 'note-taker'
  });

  var extraHeaders = ['x-note-archive', 'authorization', 'content-type'];

  var corsSimple = restify.CORS({
    credentials: true,
    headers: extraHeaders
  });
  // This is actually what the preflight handler in the
  // router uses, not the CORS plugin functions.
  restify.CORS.ALLOW_HEADERS = restify.CORS.ALLOW_HEADERS.concat(extraHeaders);
  server.use(corsSimple);

  server.use(
    restify.bodyParser({
      maxBodySize: 12000000,
      mapFiles: true
    })
  );

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
    if (!req.params || (!req.params.caption && !req.params.buffer)) {
      res.json(400, { message: 'Missing params.' });
      next();
      return;
    }

    webStream.write(getCellFromReq(req, getId(archiveName)));
    res.json(201, { message: 'Got it!' });
    next();
  }

  function respondHead(req, res, next) {
    if (req.method !== 'OPTIONS') {
      res.writeHead(200, {
        'content-type': 'application/json'
      });
    } else {
      res.writeHead(200, 'OK');
    }
    res.end();
    next();
  }
}

function getCellFromReq(req, id) {
  // TODO: Should probably switch over to multipart form data to handle binaries.
  var cell = pick(req.params, 'caption', 'mediaFilename', 'altText', 'isVideo');
  cell.id = id;
  cell.caption = req.params.caption;
  cell.date = new Date().toISOString();
  if (req.params.buffer && Buffer.isBuffer(req.params.buffer)) {
    // TODO: If static-web-archives someday supports multiple buffers, add them all.
    cell.buffer = req.params.buffer;
  }
  return cell;
}

module.exports = NoteTaker;
