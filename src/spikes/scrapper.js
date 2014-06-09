/* global require, console, process */
var nodeio = require('node.io');

var scraper = {
    input: ['http://mycantabria.com'],
    run: function(url) {
        this.getHtml(url, function(err, $) {
            if (err) {
                this.exit(err);
            }
            var urls = [], count = 0;
            $('h2').each( function(h2) {
                console.log('count: ' + count);
                count++;
                urls.push(h2.striptags);
            });
            this.emit(urls);
        });
    }
};

var job = new nodeio.Job({timeout:10, max: 1, wait: 1}, scraper);

nodeio.start(job, function(err, output) {
   console.log(output);
   console.log(output.length);
   process.exit();
}, true);
