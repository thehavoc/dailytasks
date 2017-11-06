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
		},
		removeTask(state, index) {
			state.tasks.splice(index, 1);
		}
	},
	actions: {
		getTasks({ commit }, date) {
			api.getTasks('', date).then(function(res) {
				commit('setTasks', res);
			});
			
		},
		getTask({ commit }, id) {
			return api.getTask(id);
			
		},		
		addQuickTask: function({ commit, dispatch }, task) {
			api.addQuickTask('', task).then(function(res) {
				commit('pushTask', res);
				commit('notification/change', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},
		updateTask: function({ commit }, task) {
			api.updateTask('', task).then(function() {
				commit('notification/change', 'The task has been updated.', { root: true });
			});
		},
		deleteTask({ commit, state }, task) {
			var index = state.tasks.indexOf(task);
			if(index > -1) {
				api.deleteTask('', task).then(function(res) {
					commit('removeTask', index);			
					commit('notification/change', 'The task has been deleted.', { root: true });
				})
			}
		},
		addTask: function({ commit, dispatch }, task) {
			api.addTask('', task).then(function(res) {
				commit('notification/change', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},		
	}
}