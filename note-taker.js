/* global Buffer, process */
var restify = require('@jimkang/restify');
var callNextTick = require('call-next-tick');
var pick = require('lodash.pick');
var seedrandom = require('seedrandom');
var RandomId = require('@jimkang/randomid');

const buffersMax = 16;

// TODO: secret should be per-archive
function NoteTaker({ archiveKits, getId, seed }, done) {
  if (!seed) {
    seed = new Date().toISOString();
  }
  var randomId = RandomId({ random: seedrandom(seed) });
  var kitsByName = {};
  archiveKits.forEach(storeKit);
  function storeKit(kit) {
    kitsByName[kit.name] = kit;
  }

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
      maxBodySize: 600000000,
      maxFileSize: 600000000,
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
    if (!req.headers['x-note-archive']) {
      res.json(400, { message: 'No note archive specified.' });
      next();
      return;
    }
    var archiveName = req.headers['x-note-archive'];
    var archiveKit = kitsByName[archiveName];

    if (!archiveKit) {
      res.json(404, { message: 'Cannot find archive.' });
      next();
      return;
    }

    if (req.headers.authorization !== `Key ${archiveKit.secret}`) {
      res.json(401);
      next();
      return;
    }

    var webStream = archiveKit.archiveStream;
    if (!webStream) {
      res.json(404, { message: 'Cannot find archive stream.' });
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

  function getCellFromReq(req, id) {
  // TODO: Should probably switch over to multipart form data to handle binaries.
    var cell = pick(
      req.params,
      'caption',
      'altText',
      'isVideo',
      'isAudio'
    );
    cell.id = id;
    cell.caption = req.params.caption;
    cell.date = new Date().toISOString();
    if (req.params.mediaFiles && typeof req.params.mediaFiles === 'string') {
      let mediaFiles;
      try {
        mediaFiles = JSON.parse(req.params.mediaFiles);
      } catch (error) {
        process.stderror.write(`Could not parse mediaFiles from cell ${id}.\n`);
      }
      if (mediaFiles) {
        // Avoid filename collisions.
        cell.mediaFiles = mediaFiles.map(mf => Object.assign({}, mf, { filename: prefixFilename(mf.filename) }));
      }
    }
    if (req.params.mediaFilename) {
      if (!cell.mediaFiles) {
        cell.mediaFiles = [];
      }
      cell.mediaFiles.push({ filename: prefixFilename(req.params.mediaFilename) });
    }

    if (req.params.buffer) {
      cell.buffer = req.params.buffer;
    }

    if (cell.mediaFiles) {
      for (let bufferNumber = 0; bufferNumber < buffersMax && cell.mediaFiles.length; ++bufferNumber) {
        let buffer = req.params['buffer' + bufferNumber];
        if (!buffer) {
          break;
        }
        if (!cell.buffers) {
          cell.buffers = [];
        }
        cell.buffers.push(Buffer.isBuffer(buffer) ? buffer : null);
      }
    }
    
    return cell;
  }

  function prefixFilename(filename) {
    return `${randomId(8)}-${filename}`;
  }
}

module.exports = NoteTaker;
