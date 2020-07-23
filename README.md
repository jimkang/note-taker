# note-taker

REST adapter for static-web-archive.

## Installation

    npm install --save @jimkang/note-taker

### Configs

After that, there's a few config files you have to create in the in a subdirectory of your project.

Every config file should end in `-config.js`. e.g.:

    deathmtn-config.js
    smidgital-digital-blog-config.js

Each config should have a 'name' property, the opts you'd pass to create a [static-web-archive](https://github.com/jimkang/static-web-archive'), under `archiveOpts`, and a secret under `secret`. The secret is something note-taker checks against when receiving posts. For example:

    const rootPath = '/usr/share/nginx/html/blog-zone/deathmtn';

    module.exports = {
      name: 'deathmtn',
      archiveOpts: {
        title: 'deathmtn',
        homeLink: 'https://smidgeo.com/notes/deathmtn',
        rootPath: rootPath + '/deathmtn',
        maxEntriesPerPage: 25,
        fileAbstractionType: 'LocalGit',
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
      },
      secret: '<Secret for posting to this>'
    }

### Running the service

    ./node_modules/.bin/note-taker <Path to directory containing config files>

You can use that command in your systemd service or other process supervisor.

That will start the service, and you can start making REST calls to it at port 5678. Here's an example call:

    curl -X POST -H 'Authorization: Key $(SECRET)' -H 'x-note-archive: deathmtn' -H 'content-type: application/json' -d '{"date": "2018-06-14", "caption": "Makefiles R gr8"}' http://localhost:5678/note

## Tests

    make test

## License

The MIT License (MIT)

Copyright (c) 2018 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
