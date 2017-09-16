/**
 * API calls related to tasks
 */

import Api from './api.js';

export default class extends Api {

	constructor() {
		super();
	}

	getTasks(callback, date) {

		super.execute('', this.route.getUrl('tasks', 'api') + date, callback, 'get');
	}

	updateTask(callback, task) {
		super.execute(task, this.route.getUrl('updateTask', 'api') + task.id , callback, 'patch');
	}    

	addTask(callback, task) {
		super.execute(task, this.route.getUrl('addTask', 'api'), callback, 'post');
	}

}