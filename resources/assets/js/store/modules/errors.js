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
		set(state, newErrors) {
			state.errors = newErrors;
			
		},
		remove(state, field) {
			state.errors = {}
		}		
	},
	actions: {
		add({ commit, state }, errors) {
			commit('set', errors);
		},

		clear({ commit }, field) {
			commit('remove', field);	
		}
	}
}