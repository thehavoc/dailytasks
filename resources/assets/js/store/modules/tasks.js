import ApiTasks from '../../api/tasks.js';

const api = new ApiTasks();

export default {
	namespaced: true,
	state: {
		tasks: []
	},
	getters: {
		tasks(state) {
			return state.tasks;			
		}
	},
	mutations: {
		setTasks(state, tasks) {
			state.tasks = tasks;
		}
	},
	actions: {
		getTasks({ commit }, date) {
			api.getTasks('test', date).then(function(res) {
				commit('setTasks', res);	
			});
			
		}
	}
}