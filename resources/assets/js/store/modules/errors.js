/**
 * Store errors provided by the API. 
 * Allow getting errors.
 */

export default {
	namespaced: true,
	state: {
		errors: {}
	},
	getters: {
		/**
		 * Get all stored errors.
		 * @param {Object} state
		 * @return {Object}
		 */
		get(state) {
			return state.errors;
		}				
	},
	mutations: {
		/**
		 * Add all errors to the store.
		 * @param {Object} state
		 * @param {newErrors} newErrors
		 * @return void
		 */
		SET(state, newErrors) {
			state.errors = newErrors;
			
		},

		/**
		 * Remove all errors to the store
		 * @param {Object} state
		 * @return void
		 */
		REMOVE(state) {
			state.errors = {}
		}		
	},
	actions: {
		/**
		 * Add errors to the store using a mutator
		 * @param {Object} commit and state
		 * @param {Object} errors
		 * @return void
		 */		
		add({ commit, state }, errors) {
			commit('SET', errors);
		},

		/**
		 * Clear all errors using a mutator
		 * @param {Object} commit
		 * @return void
		 */
		clear(commit) {
			commit('REMOVE', field);	
		}
	}
}