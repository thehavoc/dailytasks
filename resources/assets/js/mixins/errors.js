export default {
	computed: {
		formErrors: function() {
			return this.$store.getters['errors/get'];
		}
	},
	methods: {
		hasErrors: function() {
			return Object.keys(this.formErrors).length > 0;
		},
		getError(field) {
			if(this.formErrors[field]) {
				return this.formErrors[field][0];
			}
		}		
	}

}