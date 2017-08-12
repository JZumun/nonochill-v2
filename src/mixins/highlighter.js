import eventBus from "../pubsub/Bus"
import { TILE_HIGHLIGHT_EVT } from "../pubsub/Events"

export default {
	props: {
		id: Object
	},
	data() {
		return {
			highlight: false
		}
	},
	methods: {
		setHighlight(event) { eventBus.$emit(TILE_HIGHLIGHT_EVT,this.id); }
	},
	created() {
		eventBus.$on(TILE_HIGHLIGHT_EVT,high=>{
			this.highlight = (high.x == this.id.x) || (high.y == this.id.y)
		})
	}
}
