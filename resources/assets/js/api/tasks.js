/**
 * API calls related to tasks
 */

import Api from './api.js';

export default class extends Api {

	constructor() {
		super();

		this.apiUrls = {
		    tasks: 'http://dailytasks.int/tasks'
		}
	}

    getTasks(callback) {
        super.execute('', this.apiUrls.tasks, callback, 'get');
    }

}