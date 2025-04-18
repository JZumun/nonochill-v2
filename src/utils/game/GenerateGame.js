import { random } from "utils/RandomUtils";
import { count, square, range } from "utils/ArrayUtils";
import { generateMoves as solve } from "@jzumun/nonogram-solver";
import {generateRuleFromBoard} from "./GenerateRule";

const radial = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
const shuffledCount = n => count(n).sort(_ => Math.random() - 0.5);
const randomTile = size => ({ x: random(0, size - 1), y: random(0, size - 1) });
const bounded = (center, radius, size) => [
	Math.max(0, center - radius),
	Math.min(size, center + radius)
];

function generateDensity(v, b, imin=2, imax=20, omin=0.4, omax=0.5, rand=0.2, exp=3) {
	const bias = Math.max(Math.min(b / imax, 1),0);
	const input = Math.max(Math.min((v - imin) / (imax - imin), 1),0.1);
	const scaledInput = Math.pow(input, exp);
	const output = (scaledInput * (omax - omin)) + omin;
	const noise = rand*(Math.random() - 0.5 + bias)

	return output + noise;
}

export const generate = (size, colors, bias) => {
	const density = generateDensity(size, bias);
	console.log(`[${bias}] gen size=${size} colors=${colors} density=${density.toFixed(2)}`)
	const board = square(size, (i, j) => Math.random() < density ? 1 : 0);
	if (colors === 1) return board;

	const loopNum = Math.ceil(size / colors) * colors;
	for (const [index, i] of shuffledCount(loopNum).entries()) {
		const hue = (i % colors) + 1;
		const center = randomTile(size);
		const radius = Math.ceil(Math.max(size - index, 2) / 2);
		const horizontalRange = range(...bounded(center.x, radius, size));
		const verticalRange = range(...bounded(center.y, radius, size));

		for (const x of horizontalRange) {
			for (const y of verticalRange) {
				if (radial(center, { x, y }) <= radius) {
					board[x][y] = board[x][y] ? hue : 0;
				}
			}
		}
	}

	return board;
};

export default function(size, colors, max=20) {
	let board;
	for (let i = 0; i < max; i++) {
		board = generate(size, colors, i);
		try {
			const rules = generateRuleFromBoard(board);
			for (const moves of solve(rules)) {};
			return board;
		} catch(err) {}
	}
	console.log("exceeded max attempts. returning last generated board");
	return board;
}
