export const count = (n, map=i=>i) => Array.from(new Array(n), (val, index) => map(index));
export const range = (a, b) => count(b - a).map(i => i + a);
export const square = (n, fn) => count(n).map(i => count(n).map(j => fn(i, j)));
export const sameArrays = (a, b, pred = (x, y) => x === y) => a && b && a.length === b.length && a.every((x, i) => pred(x, b[i]));
export const filteredLength = (arr = [], pred = x => x) => arr.filter(pred).length;
