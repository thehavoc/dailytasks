/**
 * This is a class that handles all Ajax requests of the app
 */

import Route from '../route/index.js';

export default class {

	/**
	 * Load the route class.
	 */
	constructor() {
		this.route = new Route();
	}

	/**
	 * Send a request to a given URL. 
	 * @param {String} url
	 * @param {Object} data
	 * @param {String} method
	 * @return {Promise}
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

	/**
	 * Execute a GET request
	 * @param {String} url
	 * @param {Object} data
	 * @return {Promise}
	 */
	get(url, data) {
		return this.execute(url, data, 'get');
	}

	/**
	 * Execute a POST request
	 * @param {String} url
	 * @param {Object} data
	 * @return {Promise}
	 */
	post(url, data) {
		return this.execute(url, data, 'post');
	}

	/**
	 * Execute a PATCH request
	 * @param {String} url
	 * @param {Object} data
	 * @return {Promise}
	 */
	patch(url, data) {
		return this.execute(url, data, 'patch');
	}	

	/**
	 * Execute a DELETE request
	 * @param {String} url
	 * @param {Object} data
	 * @return {Promise}
	 */
	delete(url ,data) {
		return this.execute(url, data, 'delete');
	}
}