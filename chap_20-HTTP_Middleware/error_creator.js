/*
A middleware component that throws an error
*/

function errorCreator() {
	return function(req, res, next) {
		throw new Error('This is an error');
	};
}
module.exports = errorCreator;