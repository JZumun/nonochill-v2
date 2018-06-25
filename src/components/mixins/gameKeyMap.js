import {
	ACTION_TOGGLE_TILE,
	ACTION_ANCHOR_COLOR,
	ACTION_REVERSE_COLOR
} from "store/actions";
import {
	ACTION_UNDO_MOVE,
	ACTION_REDO_MOVE
} from "store/modules/history";
import { mapActions } from "vuex";

const preventDefault = fn => e => {
	e.preventDefault();
	fn(e);
};
const assignTo = (map = {}, thing) => el => {
	map[el] = thing;
};

export default {
	data () {
		return { activeTile: { x: 0, y: 0 }};
	},
	computed: {
		keymap () {
			const map = {
				"`": {
					keydown: e => this.reverseColor(true),
					keyup: e => this.reverseColor(false)
				},
				up: e => this.moveActiveTile({ dx: -1 }),
				down: e => this.moveActiveTile({ dx: 1 }),
				left: e => this.moveActiveTile({ dy: -1 }),
				right: e => this.moveActiveTile({ dy: 1 }),
				enter: e => this.toggle(this.activeTile)
			};
			[1, 2, 3, 4, 5].forEach(assignTo(map, {
				keydown: e => this.anchorColor(e.keyCode - 48),
				keyup: e => this.anchorColor(null)
			}));
			["ctrl+z", "meta+z"].forEach(assignTo(map, preventDefault(this.undo)));
			["ctrl+shift+z", "meta+shift+z"].forEach(assignTo(map, preventDefault(this.redo)));

			return map;
		}
	},
	methods: {
		...mapActions({
			toggle: ACTION_TOGGLE_TILE,
			undo: ACTION_UNDO_MOVE,
			redo: ACTION_REDO_MOVE,
			anchorColor: ACTION_ANCHOR_COLOR,
			reverseColor: ACTION_REVERSE_COLOR
		}),
		moveActiveTile ({ dx = 0, dy = 0 } = 0) {
			const size = this.board.length;
			const x = Math.max(0, Math.min(size - 1, this.activeTile.x + dx));
			const y = Math.max(0, Math.min(size - 1, this.activeTile.y + dy));

			this.activeTile = { x, y };
		}
	}
};
