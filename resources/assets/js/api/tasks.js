/**
 * API calls related to tasks
 */

import Api from './api.js';

export default class extends Api {

	getTasks(callback, date) {

		super.execute('', this.routes.api.tasks + date, callback, 'get');
	}

	updateTask(callback, task) {
		super.execute(task, this.routes.api.updateTask + task.id , callback, 'patch');
	}    

	addTask(callback, task) {
		super.execute(task, this.routes.api.addTask , callback, 'post');
	}

}