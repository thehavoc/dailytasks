export default {
	namespaced: true,
	state: {
		errors: {}
	},
	getters: {
		get(state) {
			return state.errors;
		}				
	},
	mutations: {
		SET(state, newErrors) {
			state.errors = newErrors;
			
		},
		REMOVE(state, field) {
			state.errors = {}
		}		
	},
	actions: {
		add({ commit, state }, errors) {
			commit('SET', errors);
		},

		clear({ commit }, field) {
			commit('REMOVE', field);	
		}
	}
}