export default (fn, err = x => null) => {
	if (typeof Storage !== undefined) { return fn(window.localStorage); }
	return err();
};
