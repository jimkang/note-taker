const rootPath = '/usr/share/nginx/html/smidgeo.com/take-a-break/';

module.exports = {
  name: 'take-a-break',
  archiveOpts: {
    title: 'take-a-break.exe',
    homeLink: 'https://smidgeo.com/take-a-break',
    rootPath,
    maxEntriesPerPage: 25,
    fileAbstractionType: 'LocalGit',
    footerHTML: `<footer id="footer">
    <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
    </div>
    <div>
      <a href="https://smidgeo.com/take-a-break/rss/index.rss">RSS feed</a>
    </div>
    <div>
      <a href="mailto:jimkang@fastmail.com">jimkang@fastmail.com</a>
    </div>
    <div>
      Want to read more stuff?
      <ul>
        <li><a href="https://smidgeo.com/bots/">Some bots</a></li>
        <li><a href="https://tinyletter.com/jimkang">A newsletter about projects and plans</a></li>
        <li><a href="https://jimkang.com">The maintainer</a></li>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://smidgeo.com/take-a-break',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/take-a-break/rss/index.rss',
      site_url: 'https://smidgeo.com/take-a-break/'
    }
  },
  secret: require('./secrets')['take-a-break']
};
