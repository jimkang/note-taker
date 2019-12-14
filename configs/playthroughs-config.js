const rootPath = '/usr/share/nginx/html/smidgeo.com/notes/playthroughs/';

module.exports = {
  name: 'playthroughs',
  archiveOpts: {
    title: 'Playthroughs',
    homeLink: 'https://smidgeo.com/notes/playthroughs',
    rootPath,
    maxEntriesPerPage: 25,
    fileAbstractionType: 'LocalGit',
    headerExtraHTML: '<p>Playthroughs from the Land of Moif</p>',
    footerHTML: `<footer id="footer">
    <div>
      Brought to you by <a href="https://smidgeo.com">Smidgeo dot com</a>!
    </div>
    <div>
    <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
    </div>
    <div>
      <a href="https://smidgeo.com/notes/playthroughs/rss/index.rss">RSS feed</a>
    </div>
    <div>
      <a href="mailto:jimkang@fastmail.com">jimkang@fastmail.com</a>
    </div>
    <div>
      <ul>
        <li><a href="https://jimkang.com/moif/">The game</a></li>
    </footer>
    `,
    generateRSS: false,
    archiveBaseURL: 'https://smidgeo.com/notes/playthroughs',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/notes/playthroughs/rss/index.rss',
      site_url: 'https://smidgeo.com/notes/playthroughs/'
    }
  },
  secret: require('./secrets')['playthroughs']
};
