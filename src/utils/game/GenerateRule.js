
import { count } from "utils/ArrayUtils";

const generateRule = (array = []) =>
	array ? array.reduce((rule, curr) => {
		const last = rule.length - 1;
		if (curr === rule[last].val) rule[last].count++;
		else rule.push({ val: curr, count: 1 });
		return rule;
	}, [{ val: null, count: 0 }]).filter(clue => clue.val > 0 && clue.count > 0)
		: [];

export function generateRuleFromBoard(board) {
	return {
		column: count(board[0].length).map(col => generateRule(board.map(row => row[col]))),
		row: count(board.length).map(row => generateRule(board[row]))
	}
} 

export default generateRule