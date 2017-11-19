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
		SET(state, tasks) {
			state.tasks = tasks;
		},
		PUSH(state, task) {
			state.tasks.push(task);
		},
		REMOVE(state, index) {
			state.tasks.splice(index, 1);
		}
	},
	actions: {
		get({ commit }, date) {
			api.get(route.getUrl('tasks', 'api') + date).then(function(res) {
				commit('SET', res);
			});
			
		},
		task({ commit }, id) {
			return api.get(route.getUrl('getTask', 'api') + id);
		},		
		quickAdd: function({ commit, dispatch }, task) {
			api.post(route.getUrl('addQuickTask', 'api'), task).then(function(res) {
				commit('PUSH', res);
				commit('notification/CHANGE', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},
		update: function({ commit }, task) {
			api.patch(route.getUrl('updateTask', 'api') + task.id, task).then(function() {
				commit('notification/CHANGE', 'The task has been updated.', { root: true });
			});
		},
		delete({ commit, state }, task) {
			var index = state.tasks.indexOf(task);
			if(index > -1) {
				api.delete(route.getUrl('deleteTask', 'api') + task.id, task).then(function(res) {
					commit('REMOVE', index);			
					commit('notification/CHANGE', 'The task has been deleted.', { root: true });
				})
			}
		},
		add: function({ commit, dispatch }, task) {
			api.post(route.getUrl('addTask', 'api'), task).then(function(res) {
				commit('notification/CHANGE', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},		
	}
}