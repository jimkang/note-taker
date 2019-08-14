module.exports = {
  name: 'selftaggingbot',
  archiveOpts: {
    title: 'Self-Tagging Bot',
    homeLink: 'https://smidgeo.com/bots/selftaggingbot',
    rootPath: '/usr/share/nginx/html/smidgeo.com/bots/selftaggingbot',
    maxEntriesPerPage: 50,
    fileAbstractionType: 'LocalGit',
    footerHTML: `<footer>
    <div>
      <a href="https://smidgeo.com/bots/selftaggingbot/rss/index.rss">Tag urself in your RSS reader</a>
    </div>
    <div>
      <a href="https://tinyletter.com/bots">Daily self-tagging emails</a>
    </div>
    <div>
      <a href="mailto:bots@fastmail.com">bots@fastmail.com</a>
    </div>
    <div>
      <a href="https://smidgeo.com/bots">More bots</a>
    </div>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://smidgeo.com/bots/selftaggingbot',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/bots/selftaggingbot/rss/index.rss',
      site_url: 'https://smidgeo.com/bots/selftaggingbot/'
    }
  },
  secret: require('./secrets').selftaggingbot
};
