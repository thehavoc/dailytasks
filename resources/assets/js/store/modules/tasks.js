/**
 * This ia module that stores, updates, deletes and adds tasks.
 */

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
		/**
		 * Get all tasks.
		 * @param {Object} state
		 * @return {Object}
		 */	
		tasks(state) {
			return state.tasks;			
		}
	},
	mutations: {
		/**
		 * Set tasks to the state.
		 * @param {Object} state
		 * @param {Object} tasks
		 * @return void
		 */
		SET(state, tasks) {
			state.tasks = tasks;
		},

		/**
		 * Add a task to the state.
		 * @param {Object} state
		 * @param {Object} task
		 * @return void
		 */
		PUSH(state, task) {
			state.tasks.push(task);
		},

		/**
		 * Remove a task from the state.
		 * @param {Object} state
		 * @param {Object} task
		 * @return void
		 */
		REMOVE(state, index) {
			state.tasks.splice(index, 1);
		}
	},
	actions: {
		/**
		 * Get all current user's tasks by a date.
		 * @param {Object} commit
		 * @param {Object} date
		 * @return {Promise}
		 */
		get({ commit }, date) {
			return api.get(route.getUrl('tasks', 'api') + date).then(function(res) {
				commit('SET', res);
			});
			
		},

		/**
		 * Get a task by an id.
		 * @param {Object} commit
		 * @param {Integer} id
		 * @return {Promise}
		 */		
		task({ commit }, id) {
			return api.get(route.getUrl('getTask', 'api') + id);
		},		

		/**
		 * Add a task through the quick form.
		 * @param {Object} {commit, dispatch}
		 * @param {Object} task
		 * @return {Promise}
		 */
		quickAdd: function({ commit, dispatch }, task) {
			return api.post(route.getUrl('addQuickTask', 'api'), task).then(function(res) {
				commit('PUSH', res);
				commit('notification/CHANGE', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},

		/**
		 * Update a task.
		 * @param {Object} commit
		 * @param {Object} task
		 * @return {Promise}
		 */		
		update: function({ commit }, task) {
			return api.patch(route.getUrl('updateTask', 'api') + task.id, task).then(function() {
				commit('notification/CHANGE', 'The task has been updated.', { root: true });
			});
		},

		/**
		 * Delete a task.
		 * @param {Object} {commit, state}
		 * @param {Object} task
		 * @return {Promise}
		 */		
		delete({ commit, state }, task) {
			var index = state.tasks.indexOf(task);
			if(index > -1) {
				return api.delete(route.getUrl('deleteTask', 'api') + task.id, task).then(function(res) {
					commit('REMOVE', index);			
					commit('notification/CHANGE', 'The task has been deleted.', { root: true });
				})
			}

			return false;
		},

		/**
		 * Add a task.
		 * @param {Object} {commit, dispatch}
		 * @param {Object} task
		 * @return {Promise}
		 */			
		add: function({ commit, dispatch }, task) {
			return api.post(route.getUrl('addTask', 'api'), task).then(function(res) {
				commit('notification/CHANGE', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},		
	}
}