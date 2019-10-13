module.exports = {
  name: 'eyes-bot',
  archiveOpts: {
    title: '👀 Bot',
    homeLink: 'https://smidgeo.com/bots/eyes-bot',
    rootPath: '/usr/share/nginx/html/smidgeo.com/bots/eyes-bot',
    maxEntriesPerPage: 50,
    fileAbstractionType: 'LocalGit',
    footerHTML: `<footer>
    <div>
      <a href="https://smidgeo.com/bots/eyes-bot/rss/index.rss">RSS 👀</a>
    </div>
    <div>
      <a href="https://tinyletter.com/bots">Get 👀 emails</a>
    </div>
    <div>
      <a href="mailto:bots@fastmail.com">bots@fastmail.com 👀</a>
    </div>
    <div>
      <a href="https://smidgeo.com/bots">More bots 👀</a>
    </div>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://smidgeo.com/bots/eyes-bot',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/bots/eyes-bot/rss/index.rss',
      site_url: 'https://smidgeo.com/bots/eyes-bot/'
    }
  },
  secret: require('./secrets').eyesBot
};
