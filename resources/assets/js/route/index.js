/**
 * Include all routes of the app
 */

export default class {
	getRoutes() {
		return {
			api: {
				tasks: 'api/tasks/',
				updateTask: 'api/updateTask/',
				addTask: 'api/addTask'
			},
			web: {
				addTask: 'add-task',
				tasksUrl: ''
			}
		}
	}

	prepareUrl(path) {
		return window.baseUrl + path;
	}

	getUrl(path, type = 'web') {
		let routes = this.getRoutes();

		if(type && routes.hasOwnProperty(type) && path && routes[type].hasOwnProperty(path)) {
			return this.prepareUrl(routes[type][path]);
		}

		return this.prepareUrl('not-found');
	}
}