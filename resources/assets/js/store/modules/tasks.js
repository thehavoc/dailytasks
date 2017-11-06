import Api from '../../api/index.js';
import Route from '../../route/index.js';

const api = new Api();
const route = new Route();

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
			api.get(route.getUrl('tasks', 'api') + date).then(function(res) {
				commit('setTasks', res);
			});
			
		},
		getTask({ commit }, id) {
			return api.get(route.getUrl('getTask', 'api') + id);
		},		
		addQuickTask: function({ commit, dispatch }, task) {
			api.post(route.getUrl('addQuickTask', 'api'), task).then(function(res) {
				commit('pushTask', res);
				commit('notification/change', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},
		updateTask: function({ commit }, task) {
			api.patch(route.getUrl('updateTask', 'api') + task.id, task).then(function() {
				commit('notification/change', 'The task has been updated.', { root: true });
			});
		},
		deleteTask({ commit, state }, task) {
			var index = state.tasks.indexOf(task);
			if(index > -1) {
				api.delete(route.getUrl('deleteTask', 'api') + task.id, task).then(function(res) {
					commit('removeTask', index);			
					commit('notification/change', 'The task has been deleted.', { root: true });
				})
			}
		},
		addTask: function({ commit, dispatch }, task) {
			api.post(route.getUrl('addTask', 'api'), task).then(function(res) {
				commit('notification/change', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},		
	}
}