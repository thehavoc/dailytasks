/**
 * A mixin that provides helpful date methods related to the app.
 */

import moment from 'moment'

export default {
	
	methods: {
		/**
		 * Get the current date in a proper format.
		 * @return {String}
		 */
		getCurrentDate: function() {
			return moment().format(this.getDateFormat());
		},

		/**
		 * Format a given date.
		 * @param {String} date.
		 * @return {String}
		 */
		formatDate: function(date) {
			return moment(date).format(this.getDateFormat());
		},

		/**
		 * The date format used by the app.
		 * @return {String}
		 */
		getDateFormat: function() {
			return 'YYYY-MM-DD';
		}
	}

}