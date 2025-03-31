import { random } from "utils/RandomUtils";
import { count, square, range } from "utils/ArrayUtils";
import { solve } from "./Solver";
import {generateRuleFromBoard} from "./GenerateRule";

const radial = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
const shuffledCount = n => count(n).sort(_ => Math.random() - 0.5);
const randomTile = size => ({ x: random(0, size - 1), y: random(0, size - 1) });
const bounded = (center, radius, size) => [
	Math.max(0, center - radius),
	Math.min(size, center + radius)
];

function generateDensity(v, imin=2, imax=20, omin=0.4, omax=0.65, rand=0.2, exp=3) {
	const input = Math.max(Math.min((v - imin) / (imax - imin), 1),0.1);
	const scaledInput = Math.pow(input, exp);
	const output = (scaledInput * (omax - omin)) + omin;
	const noise = rand*(Math.random() - 0.5)

	return output + noise;
}

export const generate = (size, colors, i) => {
	const density = generateDensity(size+i);
	console.log(`[${i}] gen size=${size} colors=${colors} density=${density.toFixed(2)}`)
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
		} catch(err) {
			console.log(`[${i}] solve failed`);
		}
	}
	console.log("exceeded max attempts. returning last generated board");
	return board;
}
