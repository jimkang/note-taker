var restify = require('restify');
var callNextTick = require('call-next-tick');
var pick = require('lodash.pick');

// TODO: secret should be per-archive
function NoteTaker({ secret, staticWebStreams, getId }, done) {
  var server = restify.createServer({
    name: 'note-taker'
  });

  server.use(restify.CORS());
  server.use(restify.bodyParser({ mapParams: true }));

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
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end();
    next();
  }
}

function getCellFromReq(req, id) {
  // TODO: Should probably switch over to multipart form data to handle binaries.
  var cell = pick(req.params, 'caption', 'mediaFilename', 'altText', 'isVideo', 'buffer');
  cell.id = id; 
  cell.caption = req.params.caption;
  cell.date = new Date().toISOString();
  return cell;
}

module.exports = NoteTaker;

