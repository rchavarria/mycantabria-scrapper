var Scrapper = require('./scrapper'),
	mycantabriaScrapper = new Scrapper();

var html = mycantabriaScrapper.scrap('http://mycantabria.com');
console.log('html: ' + html);