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
            addQuickTask: this.baseApiUrl + 'addQuickTask'
        }
    }

    getTasks(callback, date) {

        super.execute('', this.apiUrls.tasks + date, callback, 'get');
    }

    updateTask(callback, task) {
        super.execute(task, this.apiUrls.updateTask + task.id , callback, 'patch');
    }    

    addTask(callback, task) {
        super.execute(task, this.apiUrls.addQuickTask , callback, 'post');
    }   

}