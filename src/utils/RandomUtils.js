export const random = (min = 0, max = 0, step = 1) => (Math.floor(Math.random() * (((max - min) / step) + 1)) + (min / step)) * step;

// http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
export function gaussian (mean, stdev) {
	var y2;
	var useLast = false;
	return function () {
		var y1;
		if (useLast) {
			y1 = y2;
			useLast = false;
		} else {
			var x1, x2, w;
			do {
				x1 = 2.0 * Math.random() - 1.0;
				x2 = 2.0 * Math.random() - 1.0;
				w = x1 * x1 + x2 * x2;
			} while (w >= 1.0);
			w = Math.sqrt((-2.0 * Math.log(w)) / w);
			y1 = x1 * w;
			y2 = x2 * w;
			useLast = true;
		}

		var retval = mean + stdev * y1;
		if (retval > 0) { return retval; }
		return -retval;
	};
}
