/**
 * Include all routes of the app
 */

export default class {
	getRoutes() {
		return {
			api: [
				{
					name: 'tasks',
					path: 'api/tasks/'
				},
				{
					name: 'updateTask',
					path: 'api/updateTask/'
				},
				{
					name: 'addTask',
					path: 'api/addTask'
				}
			],
			web: [
				{
					name: 'addTask',
					path: 'addTask'
				}
			]
		}
	}

	prepareUrl(path) {
		return window.baseUrl + path;
	}

	getUrl(path, type = 'web') {
		let routes = this.getRoutes();

		if(routes[type].length && path) {

			for(let route of routes[type]) {
				if(route.name === path) {
					return this.prepareUrl(route.path);
				}
			}

		}

		return this.prepareUrl('not-found');
	}
}