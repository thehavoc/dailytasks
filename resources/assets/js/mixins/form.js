import Errors from '../forms/errors.js';

export default {
	data() {
		return {
			errors: new Errors()	
		}
	},
	methods: {
		errorsCallback: function(response) {
			if(response) {
				this.errors.add(response);
			}
		}
	}

}