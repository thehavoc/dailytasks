/**
 * API calls related to tasks
 */

import Api from './api.js';

export default class extends Api {

    constructor() {
        super();
        
        this.apiUrls = {
            tasks: this.baseApiUrl + 'tasks/',
            updateTask: this.baseApiUrl + 'updateTask/',
            addTask: this.baseApiUrl + 'addTask',
        }
    }

    getTasks(callback, date) {

        super.execute('', this.apiUrls.tasks + date, callback, 'get');
    }

    updateTask(callback, task) {
        super.execute(task, this.apiUrls.updateTask + task.id , callback, 'patch');
    }    

    addQuickTask(callback, task) {
        super.execute(task, this.apiUrls.addQuickTask , callback, 'post');
    }

    addTask(callback, task) {
        super.execute(task, this.apiUrls.addTask , callback, 'post');
    }

}