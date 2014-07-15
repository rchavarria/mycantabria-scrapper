/*global require, console*/
var Scrapper = require('./scrapper'),
    mycantabriaScrapper = new Scrapper(),
    promise = mycantabriaScrapper.scrap('http://mycantabria.com');

// wait until promises are resolved or rejected
promise.done();
