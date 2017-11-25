/**
 * Include all routes of the app
 */

export default class {

	/**
	 * Get all web and app URLs.
	 * @return {Object}
	 */
	getRoutes() {
		return {
			api: {
				tasks: 'api/tasks/',
				updateTask: 'api/updateTask/',
				getTask: 'api/getTask/',
				addTask: 'api/addTask',
				addQuickTask: 'api/addQuickTask',
				deleteTask: 'api/deleteTask/',
			},
			web: {
				addTask: 'add-task',
				editTask: 'edit-task',
				tasksUrl: ''
			}
		}
	}

	/**
	 * Prepare the absolute URL of a given path.
	 * Use a global JavaScript variable for the base URL.
	 * @param {String} field
	 * @return {String}
	 */
	prepareUrl(path) {
		return window.baseUrl + path;
	}

	/**
	 * Get an absolute URL from all routes based on a given path
	 * @param {String} path
	 * @param {String} type (web|api)
	 * @return {String}
	 */
	getUrl(path, type = 'web') {
		let routes = this.getRoutes();

		if(type && routes.hasOwnProperty(type) && path && routes[type].hasOwnProperty(path)) {
			return this.prepareUrl(routes[type][path]);
		}

		return this.prepareUrl('not-found');
	}
}