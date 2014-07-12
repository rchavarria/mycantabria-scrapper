var Q = require('q');

function createPromise(value) {
	var deferred = Q.defer(),
		delay = 10 * 1000,
		callback = function () {
			deferred.resolve(value);
		};

	setTimeout(callback, delay);

	// LEARN Return the promise to wait for it to be resolved
	return deferred.promise;
}

console.time('promise resolved');
console.time('func call');
createPromise(12345)
	// LEARN Use the promise returned and act in the 'then' method
	.then(function (v) {
		console.log('promise value:', v);
		console.timeEnd('promise resolved');
		// LEARN The nodejs process will finish here
	});
console.timeEnd('func call');
