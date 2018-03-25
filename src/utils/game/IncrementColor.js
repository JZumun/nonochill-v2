export default (value = -1, max = 1, reversed = false, crossed = -1) => {
	return !reversed ? value === max ? crossed : value + 1
		: value === crossed ? max : value - 1;
};
