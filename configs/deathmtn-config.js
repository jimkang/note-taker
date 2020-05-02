const rootPath = '/usr/share/nginx/html/smidgeo.com/notes/';
//const rootPath = '/mnt/storage/smidgeo.com/notes/';

module.exports = {
  name: 'deathmtn',
  archiveOpts: {
    title: 'deathmtn',
    homeLink: 'https://smidgeo.com/notes/deathmtn',
    rootPath: rootPath + '/deathmtn',
    maxEntriesPerPage: 25,
    fileAbstractionType: 'LocalGit',
    headExtraHTML: `<link rel="webmention" href="https://webmention.io/smidgeo.com_notes_deathmtn_/webmention" />
    <link rel="pingback" href="https://webmention.io/smidgeo.com_notes_deathmtn_/xmlrpc" />
    `,
    footerHTML: `<footer id="footer">
    <div>
      <a href="https://smidgeo.com/notes/deathmtn/search>Search this weblog</a>
    </div>
    <div>
      <a href="https://smidgeo.com/notes/deathmtn/rss/index.rss">RSS feed</a>
    </div>
    <div>
      <a rel="me" href="mailto:deathmtn@fastmail.com">deathmtn@fastmail.com</a>
    </div>
    <div>
      <a href="https://smidgeo.com/notes/deathmtn-reports/">TFIDF summaries of this weblog</a>
    </div>
    <br /><br />
    <div>
    <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
    </div>
    <div>
      Want to read more stuff?
      <div>
        Good reads on clean web pages:
        <ul>
        <li><a href="https://avoision.com/blog/">Avoision</a></li>
        <li><a href="https://memex.naughtons.org">John Naughton's online diary</a></li>
        </ul>
      </div>
      <ul>
        <li><a href="https://smidgeo.com/bots/">My bots</a></li>
        <li><a href="https://tinyletter.com/jimkang">My newsletter about my projects and plans</a></li>
        <li><a href="https://jimkang.com">My personal web site, whatever that means</a></li>
      </ul>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://smidgeo.com/notes/deathmtn',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/notes/deathmtn/rss/index.rss',
      site_url: 'https://smidgeo.com/notes/deathmtn/'
    }
  },
  secret: require('./secrets').deathmtn
};
