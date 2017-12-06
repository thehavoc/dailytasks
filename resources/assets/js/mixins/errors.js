/**
 * A mixin that provides reusable methods for handling form errors.
 */

import { mapGetters, mapActions } from 'vuex';

export default {
	computed: {
		...mapGetters('errors', [
			'formErrors'
		]),
	},
	methods: {
		...mapActions('errors', [
			'clear'
		]),		

		/**
		 * Whether there are any form errors.
		 * @return {Boolean}
		 */
		hasErrors() {
			return Object.keys(this.formErrors).length > 0;
		},

		/**
		 * Get an error message by a field name.
		 * @param {String} field
		 * @return {String}
		 */
		getError(field) {
			if(this.formErrors && this.formErrors.hasOwnProperty(field)) {
				return this.formErrors[field][0];
			}
		},

		/**
		 * Dispatch a request to clear the errors.
		 * @param {String} field
		 * @return void
		 */
		clearErrors() {
			if(this.formErrors) {
				this.clear();
			}
		}			
	}

}