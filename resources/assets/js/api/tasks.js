/**
 * API calls related to tasks
 */

import Api from './api.js';

export default class extends Api {

	constructor() {
		super();
		
		this.apiUrls = {
		    tasks: this.baseApiUrl + 'tasks/',
		    updateTask: this.baseApiUrl + 'updateTask/'
		}
	}

    getTasks(callback) {
        super.execute('', this.apiUrls.tasks, callback, 'get');
    }

    updateTask(callback, task) {
        super.execute(task, this.apiUrls.updateTask + task.id , callback, 'patch');
    }    

}