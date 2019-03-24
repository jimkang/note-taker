const rootPath = '/usr/share/nginx/html/smidgeo.com/daily-mrrp/';

module.exports = {
  name: 'daily-mrrp',
  archiveOpts: {
    title: 'Daily MRRP!',
    homeLink: 'https://smidgeo.com/daily-mrrp',
    rootPath,
    maxEntriesPerPage: 25,
    fileAbstractionType: 'LocalGit',
    headerExtraHTML:
      '<p>Dr. Wily is a cat of sounds. Most of those sounds are "MRRP!" Turn your sound on to hear them.</p>',
    footerHTML: `<footer id="footer">
    <div>
      Brought to you by <a href="https://smidgeo.com">Smidgeo dot com</a>!
    </div>
    <div>
    <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
    </div>
    <div>
      <a href="https://smidgeo.com/daily-mrrp/rss/index.rss">RSS feed</a>
    </div>
    <div>
      <a href="mailto:smallcatlabs@fastmail.com">smallcatlabs@fastmail.com</a>
    </div>
    <div>
      Want to read more stuff?
      <ul>
        <li><a href="https://smidgeo.com/bots/">Some bots</a></li>
        <li><a href="https://tinyletter.com/jimkang">A newsletter about projects and plans</a></li>
        <li><a href="https://jimkang.com">One of Dr. Wily's maintainers</a></li>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://smidgeo.com/daily-mrrp',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/daily-mrrp/rss/index.rss',
      site_url: 'https://smidgeo.com/daily-mrrp/'
    }
  },
  secret: require('./secrets')['daily-mrrp']
};
