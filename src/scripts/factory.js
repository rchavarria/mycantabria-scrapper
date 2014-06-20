
var Factory = module.exports = function (Q) {
	
	this.createPromise = function (ids) {
		var promise = Q(function () { return ids; });

		return promise.call();
	}
};