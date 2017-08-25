import { random } from "utils/RandomUtils";
import { count, square, range } from "utils/ArrayUtils";

const radial = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
const shuffledCount = n => count(n).sort(_ => Math.random() - 0.5);
const randomTile = size => ({ x: random(0, size - 1), y: random(0, size - 1) });
const bounded = (center, radius, size) => [
	Math.max(0, center - radius),
	Math.min(size, center + radius)
];

export default (size, colors, density) => {
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
