export const count =  n => Array.from(new Array(n),(val,index)=>index);
export const square = (n,fn) => count(n).map(i=>count(n).map(j=>fn(i,j)));
export const sameArrays = (a,b) => a && b && a.length==b.length && a.every((x,i)=>x==b[i]);
