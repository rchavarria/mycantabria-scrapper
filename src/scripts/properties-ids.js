
var PropertiesIds = module.exports = function (Q) {
	
	this.getPropertiesIds = function () {
		var ids = [2026, 2031, 2034],
			promise = Q(function () { return ids; });

		return promise.call();
	}
};