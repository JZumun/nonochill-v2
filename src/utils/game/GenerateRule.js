export default (array=[])=>
	array ? array.reduce((rule,curr)=>{
						const last = rule.length-1;
						if ( curr == rule[last].val ) rule[last].count++;
						else rule.push({ val:curr, count:1 })
						return rule;
					},[{val: null, count:0}]).filter(clue=> clue.val > 0 && clue.count > 0)
				: []
