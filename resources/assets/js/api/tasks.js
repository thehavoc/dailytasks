/**
 * API calls related to tasks
 */

import Api from './api.js';

export default class extends Api {

	constructor() {
		super();
	}

	getTasks(callback, date) {
		return super.execute('', this.route.getUrl('tasks', 'api') + date, callback, 'get');
	}

	updateTask(callback, task) {
		return super.execute(task, this.route.getUrl('updateTask', 'api') + task.id , callback, 'patch');
	}    

	addTask(callback, task) {
		return super.execute(task, this.route.getUrl('addTask', 'api'), callback, 'post');
	}

	addQuickTask(callback, task) {
		return super.execute(task, this.route.getUrl('addQuickTask', 'api'), callback, 'post');
	}

	deleteTask(callback, task) {
		return super.execute(task, this.route.getUrl('deleteTask', 'api') + task.id, callback, 'delete');
	}

	getTask(id) {
		return super.execute('', this.route.getUrl('getTask', 'api') + id, '', 'get');
	}	

}