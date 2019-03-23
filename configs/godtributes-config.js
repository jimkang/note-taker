module.exports = {
  name: 'godtributes',
  archiveOpts: {
    title: '@godtributes',
    homeLink: 'https://smidgeo.com/bots/godtributes',
    rootPath: '/usr/share/nginx/html/smidgeo.com/bots/godtributes',
    maxEntriesPerPage: 50,
    fileAbstractionType: 'LocalGit',
    footerHTML: `<footer>
    <div>
    <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
    </div>
    <div>
      <a href="https://smidgeo.com/bots/godtributes/rss/index.rss">RSS FOR THE RSS GOD</a>
    </div>
    <div>
      <a href="mailto:bots@fastmail.com">bots@fastmail.com</a>
    </div>
    <div>
      <a href="https://smidgeo.com/bots">BOTS FOR THE BOT GOD</a>
    </div>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://smidgeo.com/bots/godtributes',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/bots/godtributes/rss/index.rss',
      site_url: 'https://smidgeo.com/bots/godtributes/'
    }
  },
  secret: require('./secrets').godtributes
};
