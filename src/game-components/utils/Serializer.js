const parse = el =>
	Array.isArray(el) ? el.map(x=>x.toString()).join("|")
										: el.toString();
const deparse = el =>
	el.includes("|")	? el.split("|").map( x.split(",").map(x=>parseInt(x)).filter(x=>!Number.isNaN(x)) )
										: parseInt(el);

export const serialize = (...stuff) => btoa( stuff.map( parse ).join("//") );
export const deserialize = (code) => atob(code).split("//").map( deparse );
