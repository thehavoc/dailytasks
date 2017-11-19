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
		CHANGE(state, newMessage) {
			state.message = newMessage;
		}
	}
}