module.exports = {
  name: 'fuckingshakespeare',
  archiveOpts: {
    title: 'Fucking Shakespeare',
    homeLink: 'https://smidgeo.com/bots/fuckingshakespeare',
    rootPath: '/usr/share/nginx/html/smidgeo.com/bots/fuckingshakespeare',
    maxEntriesPerPage: 50,
    fileAbstractionType: 'LocalGit',
    footerHTML: `<footer>
    <div>
    <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
    </div>
    <div>
      <a href="https://smidgeo.com/bots/fuckingshakespeare/rss/index.rss">Fucking RSS</a>
    </div>
    <div>
      <a href="https://tinyletter.com/bots">Fucking get Shakespeare sent the fuck to you fucking every fucking day</a>
    </div>
    <div>
      <a href="mailto:bots@fastmail.com">bots@fastmail.com</a>
    </div>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://smidgeo.com/bots/fuckingshakespeare',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/bots/fuckingshakespeare/rss/index.rss',
      site_url: 'https://smidgeo.com/bots/fuckingshakespeare/'
    }
  },
  secret: require('./secrets').fuckingshakespeare
};
