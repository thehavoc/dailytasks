/**
 * This is a class that will handle Ajax requests.
 */

import Route from './route.js';

export default class {

	constructor() {
		let route = new Route();
		this.routes = route.getRoutes();
	}

	/**
	 * Send a request to a given URL. 
	 * A callback function is executed after the request.
	 */
	execute(data, url, callback, method = 'get') {
		if(!url || !callback) {
			return false;
		}

		return new Promise((resolve) => {
			window.axios({
				method: method,
				url: url,
				data: data
			})
			.then(function (response) {
				callback(response.data, 'success');

				resolve(response.data);
			})
			.catch(function (errors) {
				alert(errors);
			});	
		});
	}

}