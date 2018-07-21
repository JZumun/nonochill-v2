export default {
    namespaced: true,
    state() {
       return { show: false }
    },
    mutations: {
        toggle(state, value) {
            state.show = value
        }
    }
}