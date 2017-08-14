/**
	Rule: { val, count } => {val,count}
	RuleList: [Rule] => [serialize(Rule)]
	RuleGroup: [RuleList] => [serialize(ruleGroup)]
**/

const serializeRule = rule => `{${rule.val},${rule.count}}`
const serializeRuleList = list => `[${ list.map(serializeRule).join("") }]`
const serializeRuleGroup = group => `[${ group.map(serializeRuleList).join("|") }]`
export const serialize = ({size,colors,column,row}) => {
	return btoa([ size, colors, serializeRuleGroup(column), serializeRuleGroup(row) ].join("//"));
}

const deserializeRule = string => {
	const arr = string.replace(/[\{\}\[\]]/g,"").split(",").map(x=>parseInt(x));
	return { val: arr[0], count: arr[1] }
}
const deserializeList = string => string.split("}{").map(deserializeRule);
const deserializeRuleGroup = string => string.split("|").map(deserializeList);
export const deserialize = (string) => {
	const arr = atob(string).split("//");
	return {
		size: parseInt(arr[0]),
		colors: parseInt(arr[1]),
		column: deserializeRuleGroup(arr[2]),
		row: deserializeRuleGroup(arr[3])
	}
}
