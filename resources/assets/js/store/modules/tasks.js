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
		getTasks({ commit }, date) {
			return api.get(route.getUrl('tasks', 'api') + date).then((res) => {
				commit('SET', res);
			});
			
		},

		/**
		 * Get a task by an id.
		 * @param {Object} commit
		 * @param {Integer} id
		 * @return {Promise}
		 */		
		getTask({ commit }, id) {
			return api.get(route.getUrl('getTask', 'api') + id);
		},		

		/**
		 * Add a task through the quick form.
		 * @param {Object} {commit, dispatch}
		 * @param {Object} task
		 * @return {Promise}
		 */
		quickAdd({ commit, dispatch }, task) {
			return api.post(route.getUrl('addQuickTask', 'api'), task).then((res) => {
				commit('PUSH', res);
				dispatch('notification/update', 'A new task has been added.', { root: true });
			}).catch((errors) => {
				dispatch('errors/add', errors, { root: true });
			});
		},

		/**
		 * Update a task.
		 * @param {Object} commit
		 * @param {Object} task
		 * @return {Promise}
		 */		
		update({ dispatch }, task) {
			return api.patch(route.getUrl('updateTask', 'api') + task.id, task).then(() => {				
				dispatch('notification/update', 'The task has been updated.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},

		/**
		 * Delete a task.
		 * @param {Object} {commit, state}
		 * @param {Object} task
		 * @return {Promise}
		 */		
		delete({ commit, state, dispatch }, task) {
			return api.delete(route.getUrl('deleteTask', 'api') + task.id, task).then((res) => {
				let index = state.tasks.indexOf(task);

				if(index > -1) {
					commit('REMOVE', index);

				}

				dispatch('notification/update', 'The task has been deleted.', { root: true });
			})
				
			return false;
		},

		/**
		 * Add a task.
		 * @param {Object} {commit, dispatch}
		 * @param {Object} task
		 * @return {Promise}
		 */			
		create({ commit, dispatch }, task) {
			return api.post(route.getUrl('addTask', 'api'), task).then((res) => {
				dispatch('notification/update', 'A new task has been added.', { root: true });
			}).catch(function(errors) {
				dispatch('errors/add', errors, { root: true });
			});
		},		
	}
}