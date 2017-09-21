export default {
	namespaced: true,
	state: {
		message: ''	  
	},
	getters: {
		getMessage(state) {
			return state.message;
		}
	},
	mutations: {
		changeMessage(state, newMessage) {
			state.message = newMessage;
		}
	}
}