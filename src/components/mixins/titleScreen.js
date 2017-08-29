
import { deserialize } from "utils/game/Serializer";
import { START_GAME } from "store/mutations";
export default {
	data () {
		return {
			serialization: "MTcvLzE3Ly8zLy9bW118W3szLDF9ezEsM317MSwzfV18W3sxLDF9ezEsMX17MSwxfXszLDF9XXxbezIsMX17MSwzfXsxLDF9ezEsMX1dfFt7MywxfV18W3syLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX17MSwxfXsxLDF9ezIsMX17MiwxfV18W3sxLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX1dfFt7MSwxfXsxLDN9ezEsM317MiwxfV18W3sxLDF9ezIsMn17MiwxfV18W3syLDF9ezEsM317MSwzfXsyLDF9XXxbezEsMX17MywxfV18W3syLDF9ezEsM31dfFt7MSwxfXsxLDF9ezEsM317MywxfV18W3szLDF9ezEsM317MSwxfV18W11dLy9bW118W3szLDF9ezIsMX17MiwxfXsxLDF9ezEsMX17MiwxfXsyLDF9ezMsMX1dfFtdfFt7MSwzfXsxLDN9ezEsM317MSwzfV18W3sxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX1dfFt7MSwxfXsxLDF9ezEsM317MSwxfXsxLDF9ezEsM31dfFtdfFt7MSwzfXsxLDF9ezEsMX17MSwxfXsxLDF9ezEsMX1dfFt7MSwxfXsxLDN9ezEsMX17MSwxfXsxLDF9XXxbezEsM317MSwxfXsxLDF9ezEsMX17MSwyfXsxLDJ9XXxbXXxbezIsMX17MiwxfXsyLDJ9XXxbezIsMX17MiwyfV18W118W3szLDF9ezMsMX17MiwxfXsxLDF9ezIsMX17MywxfXszLDF9XXxbXXxbXV0vLyMzYTFhMmY/I0EzNjU4Qz8jZTdjYmRkPyNmZjcxODc/IzhkYjBlMQ==",
			contents: `00000000000000000
03020201010202030
00000000000000000
01110111011101110
01010101010101010
01010111010101110
00000000000000000
01110101010100100
01000111010100100
01110101010110110
00000000000000000
00000202022000000
00000020002200000
00000000000000000
00303020102030300
00000000000000000
00000000000000000`.split(/\s+/g).map(row => row.split("").map(i => parseInt(i)))
		};
	},
	created () {
		const options = deserialize(this.serialization);
		this.$store.commit(START_GAME, {
			size: options.width,
			rules: {
				row: options.row,
				column: options.column
			},
			board: this.contents,
			colors: options.colors
		});
	}
};
