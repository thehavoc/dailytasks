/**
 * Include all routes of the app
 */

export default class {
	getRoutes() {
		return {
			api: {
	            tasks: this.prepareUrl('tasks/'),
	            updateTask: this.prepareUrl('updateTask/'),
	            addTask: this.prepareUrl('addTask'),
			},
			web: {

			}
		}
	}

	prepareUrl(path) {
		return window.apiUrl + path;
	}
}