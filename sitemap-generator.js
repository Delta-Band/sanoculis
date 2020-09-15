const sitemap = require('nextjs-sitemap-generator');

/*
TODO:
replace baseUrl with actual url
 */

sitemap({
  baseUrl: 'https://nucleai.com',
  pagesDirectory: `${__dirname}/pages`,
  targetDirectory: `${__dirname}/public`,
  ignoredExtensions: [
    'xml',
    'scss'
  ]
});
