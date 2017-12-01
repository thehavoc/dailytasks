/**
 * This is a module that stores a notification message that is shown to the user once an action is completed(e.g. updating a task).
 */

export default {
	namespaced: true,
	state: {
		message: ''	  
	},
	getters: {
		/**
		 * Get the message.
		 * @param {Object} state
		 * @return {String}
		 */
		get(state) {
			return state.message;
		}
	},
	mutations: {
		/**
		 * Change the message.
		 * @param {Object} state
		 * @param {String} newMessage
		 * @return void
		 */		
		CHANGE(state, newMessage) {
			state.message = newMessage;
		}
	}
}