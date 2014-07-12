var Q = require('q');

function createPromise(value) {
	var deferred = Q.defer(),
		delay = 10 * 1000,
		callback = function () {
			deferred.resolve(value);
		};

	setTimeout(callback, delay);

	return deferred.promise;
}

console.time('promises');
console.time('func call');
createPromise(12345)
	.then(function (v) {
		console.log('promise value:', v);
		console.timeEnd('promises');
	});
console.timeEnd('func call');
