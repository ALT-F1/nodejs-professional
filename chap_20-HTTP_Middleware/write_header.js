/*
a middleware component that introduces a header into the response header section.

This middleware component uses a third argument "next" that contains the callback to be invoked when this component is done.
*/
function writeHeader(name, value) {
	return function(req, res, next) {
		res.setHeader(name, value);
		next();
	};
}
module.exports = writeHeader;