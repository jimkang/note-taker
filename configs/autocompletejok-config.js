module.exports = {
  name: 'autocompletejok',
  archiveOpts: {
    title: 'Autocomplete Jokes',
    homeLink: 'https://smidgeo.com/bots/autocompletejok',
    rootPath: '/usr/share/nginx/html/smidgeo.com/bots/autocompletejok',
    maxEntriesPerPage: 50,
    fileAbstractionType: 'LocalGit',
    footerHTML: `<footer>
    <div>
    <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
    </div>
    <div>
      <a href="https://smidgeo.com/bots/autocompletejok/rss/index.rss">RSS feed</a>
    </div>
    <div>
      <a href="mailto:bots@fastmail.com">bots@fastmail.com</a>
    </div>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://smidgeo.com/bots/autocompletejok',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/bots/autocompletejok/rss/index.rss',
      site_url: 'https://smidgeo.com/bots/autocompletejok/'
    }
  },
  secret: require('./secrets').autocompletejok
};
