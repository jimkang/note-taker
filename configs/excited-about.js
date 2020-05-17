const rootPath = '/usr/share/nginx/html/andersonkang.com/excited-about/';

module.exports = {
  name: 'excited-about',
  archiveOpts: {
    title: 'What are you excited about today?',
    homeLink: 'https://andersonkang.com/excited-about',
    rootPath,
    maxEntriesPerPage: 10,
    fileAbstractionType: 'fs'
  },
  secret: require('./secrets')['excited-about']
};
