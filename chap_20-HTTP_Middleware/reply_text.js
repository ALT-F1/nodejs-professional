/*
simple middleware component that responds with the string sent as a paramter
and ends the response.
*/

function replyText(text) {
	return function(req, res) {
		res.end(text);
		console.log("text output:", text);
	};
}
module.exports = replyText;