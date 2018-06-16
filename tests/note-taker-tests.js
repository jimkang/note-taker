/* global process */
var test = require('tape');
var assertNoError = require('assert-no-error');
var NoteTaker = require('../note-taker');
var request = require('request');
var omit = require('lodash.omit');

const port = 5678;
const serverHost = process.env.SERVER || 'localhost';

var testCases = [
  {
    name: 'Text',
    body: {
      //      name: 'Text note',
      date: new Date('2018-06-14'),
      caption: `OK, I am testing a thing.

      Here is more text.`
    },
    targetArchive: 'test-archive',
    archiveStreamName: 'test-archive',
    secret: 'secret',
    secretToUse: 'secret',
    getId(archiveName) {
      return archiveName + '-0';
    },
    expectedStatusCode: 201,
    expectedWrite: {
      //name: 'Text note',
      id: 'test-archive-0',
      caption: `OK, I am testing a thing.

      Here is more text.`
      //mediaFilename: undefined,
      //altText: undefined,
      //buffer: undefined,
      //isVideo: undefined
    }
  },
  {
    name: 'Bad secret auth',
    body: {
      //      name: 'Text note',
      date: new Date('2018-06-14'),
      caption: `OK, I am testing a thing.

      Here is more text. This should not get written.`
    },
    secret: 'secret',
    secretToUse: 'bad-secret',
    targetArchive: 'test-archive',
    archiveStreamName: 'test-archive',
    getId(archiveName) {
      return archiveName + '-0';
    },
    expectedStatusCode: 401,
    expectedWrite: null
  },
  {
    name: 'Bad archive',
    body: {
      //      name: 'Text note',
      date: new Date('2018-06-14'),
      caption: `OK, I am testing a thing.

      Here is more text. This should not get written.`
    },
    secret: 'secret',
    secretToUse: 'secret',
    targetArchive: 'non-existent-test-archive',
    archiveStreamName: 'test-archive',
    getId(archiveName) {
      return archiveName + '-0';
    },
    expectedStatusCode: 404,
    expectedWrite: null
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name, testPutNote);

  function testPutNote(t) {
    var server;
    var mockWebStream = {
      write: checkWrite
    };

    NoteTaker(
      {
        secret: testCase.secret,
        staticWebStreams: {
          [testCase.archiveStreamName]: mockWebStream
        },
        getId: testCase.getId
      },
      startServer
    );

    function startServer(error, theServer) {
      assertNoError(t.ok, error, 'Server created.');
      if (error) {
        console.log('Error creating server:', error);
        process.exit();
      }
      server = theServer;
      server.listen(port, runRequest);
    }

    function runRequest(error) {
      assertNoError(t.ok, error, 'Server started correctly.');
      var reqOpts = {
        method: 'POST',
        url: `http://${serverHost}:${port}/note`,
        body: testCase.body,
        json: true,
        headers: {
          Authorization: `Key ${testCase.secretToUse}`,
          'X-Note-Archive': testCase.targetArchive
        }
      };
      request(reqOpts, checkResponse);
    }

    function checkWrite(writeObject) {
      if (testCase.expectedWrite) {
        t.ok(writeObject.date, 'Date is in write object.');
        t.deepEqual(
          omit(writeObject, 'date'),
          testCase.expectedWrite,
          'Correct object is written to stream.'
        );
      } else {
        t.fail('Does not write to stream');
      }
    }

    function checkResponse(error, res, body) {
      assertNoError(t.ok, error, 'No error while making request.');
      t.equal(
        res.statusCode,
        testCase.expectedStatusCode,
        'Correct status code is returned.'
      );
      if (res.statusCode !== 200) {
        console.log('body:', body);
      }
      server.close(t.end);
    }
  }
}
