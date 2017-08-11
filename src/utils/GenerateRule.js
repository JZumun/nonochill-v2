export default (array,predicate=x=>x) =>
	array.reduce((rule,curr)=>{
		const last = rule.length-1;
		if (predicate(curr)) rule[last]++;
		else if (rule[last] > 0) rule.push(0)
		return rule;
	},[0]).filter(x=>x)
