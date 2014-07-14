/*global require, console*/
var Scrapper = require('./scrapper'),
    mycantabriaScrapper = new Scrapper(),
    promise = mycantabriaScrapper.scrap('http://mycantabria.com');

promise
	.then(function () {
		console.log('end');
	})	
    .done();
