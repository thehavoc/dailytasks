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
		},
		pushTask(state, task) {
			state.tasks.push(task);
		}
	},
	actions: {
		getTasks({ commit }, date) {
			api.getTasks('', date).then(function(res) {
				commit('setTasks', res);	
			});
			
		},
		addTask: function({ commit }, task) {
			api.addQuickTask('', task).then(function(res) {
				commit('pushTask', res);
				commit('notification/changeMessage', 'A new task has been added.', { root: true });
			});
		},
		updateTask: function({ commit }, task) {
			api.updateTask('', task).then(function() {
				commit('notification/changeMessage', 'The task has been updated.', { root: true });
			});
		}
	}
}