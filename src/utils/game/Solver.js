import { count } from "../ArrayUtils";

export class SolveError {
	constructor(message, unsolvedRows, unsolvedColumns) {
		this.message = `Could not finish puzzle: ${message}`;
		this.unsolvedRows = Object.keys(unsolvedRows);
		this.unsolvedColumns = Object.keys(unsolvedColumns);
	}
}
export function* solve(rules) {
	const width = rules.column.length;
	const height = rules.row.length;
	
	const unsolvedRowMap = Object.fromEntries(
		rules.row.map((row, x) => [x, { x, solns: generateSolutions(width, row) }])
	);
	const unsolvedColMap = Object.fromEntries(
		rules.column.map((col, y) => [y, { y, solns: generateSolutions(height, col) }])
	);
	
	let unsolvedRowCount = rules.row.length;
	let unsolvedColCount = rules.column.length;
	while (unsolvedRowCount && unsolvedColCount) {
		const unsolvedRows = Object.values(unsolvedRowMap);
		const unsolvedCols = Object.values(unsolvedColMap);
		
		const unsolvedRowIdxs = Object.keys(unsolvedRowMap).map((i) => Number(i));
		const unsolvedColIdxs = Object.keys(unsolvedColMap).map((i) => Number(i));
		const rowMoves = unsolvedRows.flatMap((row) => findMovesFromRow(row.x, unsolvedColIdxs, row.solns));
		const colMoves = unsolvedCols.flatMap((col) => findMovesFromCol(col.y, unsolvedRowIdxs, col.solns));

		if (rowMoves.length) {
			yield rowMoves;
		}
		
		if (colMoves.length) {
			yield colMoves;
		}
		
		let prunedCount = 0;
		for (const row of unsolvedRows) {
			if (isLineSolved(row.solns)) {
				delete unsolvedRowMap[row.x];
				unsolvedRowCount--;
				prunedCount++
			} else if (isLineConflict(row.solns)) {
				throw new SolveError(`Row ${row.x} has no solutions`, unsolvedRowMap, unsolvedColMap);
			} else {
				const solnCount = row.solns.length;
				row.solns = pruneRowSolutions(row.solns, filterMovesForRow(row.x, colMoves));
				const newSolnCount = row.solns.length;
				prunedCount+=solnCount - newSolnCount;
			}
		}
		for (const col of unsolvedCols) {
			if (isLineSolved(col.solns)) {
				delete unsolvedColMap[col.y];
				unsolvedColCount--;
				prunedCount++
			} else if (isLineConflict(col.solns)) {
				throw new SolveError(`Column ${col.y} has no solutions`, unsolvedRowMap, unsolvedColMap);
			} else {
				const solnCount = col.solns.length;
				col.solns = pruneColSolutions(col.solns, filterMovesForCol(col.y, rowMoves));
				const newSolnCount = col.solns.length;
				prunedCount+=solnCount - newSolnCount;
			}
		}
		
		if ((unsolvedColCount+unsolvedRowCount > 0) && (rowMoves.length == 0) && (colMoves.length == 0)) {
			throw new SolveError("May have multiple solutions (or one the solver doesn't know how to find)", unsolvedRowMap, unsolvedColMap);
		}

		if (prunedCount == 0) {
			throw new SolveError("Unable to narrow possibilities without guessing", unsolvedRowMap, unsolvedColMap);
		}
	}
}

function generateSolutions(lineLength, rule) {
	// Provide an all crossed out solution for lines with no rules
	if (rule.length == 0) {
		return [count(lineLength, () => -1)];
	}

	function isSameColorAsPrevious(i) {
		const prev = rule[i - 1];
		if (!prev) {
			return false;
		}
		return prev.val === rule[i].val;
	}
	
	const nGroups = rule.length;
	const taggedRule = rule.map((r, i) => ({
		...r,
		same: isSameColorAsPrevious(i),
	}));
	const mandatorySpaces = taggedRule.filter((r) => r.same).length;
	const sumOfColoredSpaces = rule.reduce((a, r) => a + r.count, 0);
	const freeSpaces = lineLength - mandatorySpaces - sumOfColoredSpaces;
	const totalSlots = freeSpaces + nGroups;
	
	const arrangements = choose(totalSlots, nGroups);
	
	return arrangements.map((a) => {
		const slots = count(totalSlots, (i) => undefined);
		a.forEach((slot, i) => {
			slots[slot] = taggedRule[i];
		});
		return slots.flatMap((slot) => {
			if (!slot) {
				return [-1];
			}
			const val = count(slot.count, () => slot.val);
			if (slot.same) {
				val.unshift(-1);
			}
			return val;
		});
	});
}
function choose(max, pick, start = 0) {
	if (pick <= 0) {
		return [];
	}
	if (pick == 1) {
		return count(Math.max(max - start, 0), (i) => [start + i]);
	}
	
	const combs = [];
	for (let i = start; i < max - 1; i++) {
		for (const subCombo of choose(max, pick - 1, i + 1)) {
			subCombo.unshift(i);
			combs.push(subCombo);
		}
	}
	return combs;
}

const findMovesFromCol = (y, unsolvedX, lines) => findMoves(lines, unsolvedX, (x, next) => ({ tile: { x, y }, next }));
const findMovesFromRow = (x, unsolvedY, lines) => findMoves(lines, unsolvedY, (y, next) => ({ tile: { x, y }, next }));
function findMoves(lines, unsolvedSpots, solnMapper) {
	const solns = [];
	const length = lines[0].length;
	
	function allEqualAt(i) {
		return lines.map((l) => l[i]).every((n) => n === lines[0][i]);
	}
	for (let i = 0; i < length; i++) {
		if (!unsolvedSpots.includes(i)) {
			continue;
		}
		if (allEqualAt(i)) {
			solns.push(solnMapper(i, lines[0][i]));
		}
	}
	return solns;
}

function isLineConflict(solns) {
	return solns.length == 0;
}
function isLineSolved(solns) {
	return solns.length == 1;
}

const pruneColSolutions = (solns, moves) => pruneSolutions("x", solns, moves);
const pruneRowSolutions = (solns, moves) => pruneSolutions("y", solns, moves);
function pruneSolutions(dim, solns, moves) {
	return solns.filter((soln) => {
		return moves.every((m) => soln[m.tile[dim]] === m.next);
	});
}

const filterMovesForCol = (y, moves) => filterMoves("y", y, moves);
const filterMovesForRow = (x, moves) => filterMoves("x", x, moves);
function filterMoves(dim, i, moves) {
	return moves.filter((move) => move.tile[dim] == i);
}
