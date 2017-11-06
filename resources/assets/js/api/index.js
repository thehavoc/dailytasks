/**
 * This is a class that will handle Ajax requests.
 */

import Route from '../route/index.js';

export default class {

	constructor() {
		this.route = new Route();
	}

	/**
	 * Send a request to a given URL. 
	 * A callback function is executed after the request.
	 */
	execute(url, data, method = 'get') {
		if(!url) {
			return false;
		}

		return new Promise((resolve, reject) => {
			window.axios({
				method: method,
				url: url,
				data: data
			})
			.then(function (response) {

				resolve(response.data);
			})
			.catch(function (errors) {

				reject(errors.response.data);
			});	
		});
	}

	get(url, data) {
		return this.execute(url, data, 'get');
	}

	post(url, data) {
		return this.execute(url, data, 'post');
	}

	patch(url, data) {
		return this.execute(url, data, 'patch');
	}	

	delete(url ,data) {
		return this.execute(url, data, 'delete');
	}
}