export default {
	namespaced: true,
	state: {
		message: ''	  
	},
	getters: {
		get(state) {
			return state.message;
		}
	},
	mutations: {
		change(state, newMessage) {
			state.message = newMessage;
		}
	}
}