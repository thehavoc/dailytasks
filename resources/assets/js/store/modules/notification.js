export default {
	namespaced: true,
	state: {
		message: ''	  
	},
	mutations: {
		changeMessage(state, newMessage) {
			state.message = newMessage;
		}
	} 
}