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
	execute(data, url, callback, method = 'get', callbackError) {
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

				if(callback) {
					callback(response.data);
				}

				resolve(response.data);
			})
			.catch(function (errors) {

				callbackError(errors.response.data)

				reject(errors.response.data);

			});	
		});
	}

}