/**
 * Helpful form errors methods.
 */

export default {
	computed: {
		formErrors: function() {
			return this.$store.getters['errors/get'];
		}
	},
	methods: {
		/**
		 * Whether there are any form errors.
		 * @return {Boolean}
		 */
		hasErrors: function() {
			return Object.keys(this.formErrors).length > 0;
		},

		/**
		 * Get an error message by a field name.
		 * @param {String} field
		 * @return {String}
		 */
		getError(field) {
			if(this.formErrors[field]) {
				return this.formErrors[field][0];
			}
		}		
	}

}