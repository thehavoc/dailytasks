/**
 * This is a class that handles all routes of the app.
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
				login: 'login',
				register: 'register',
				logout: '#logout-form',
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
		if(window.baseUrl) {
			return window.baseUrl + path;			
		}

		return path;
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