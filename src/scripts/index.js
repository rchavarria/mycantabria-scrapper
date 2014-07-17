/*global require*/
var Scrapper = require('./scrapper'),
    mycantabriaScrapper = new Scrapper(),
    promise = mycantabriaScrapper.scrap();

// wait until promises are resolved or rejected
promise.done();
