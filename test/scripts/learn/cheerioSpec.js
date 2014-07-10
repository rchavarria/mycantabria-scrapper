/*global describe, it, require, expect*/
describe('Learning: Cheerio', function() {
	var cheerio = require('cheerio');

	describe('#basics', function () {
		var $ = cheerio.load('<h2 class="title">Hello world</h2>');

		it('selects an HTML element', function () {
			expect($('h2').html()).to.equal('Hello world');
		});
	});
});