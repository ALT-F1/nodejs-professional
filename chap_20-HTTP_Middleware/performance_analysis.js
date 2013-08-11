var start = new Date().getTime();
var maxCount = 100;
for (var n = 0; n < maxCount; n++) {
	/* perform the operation to be measured */
}
var elapsed = new Date().getTime() - start;

assert(true, "Measured time: " + elapsed);

console.log("log: elapsed time", elapsed);