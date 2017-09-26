export default class {

	constructor() {
		this.errors = {};
	}

	get(field) {
		if(this.errors[field]) {
			return this.errors[field][0];
		}
	}

	any() {
		return Object.keys(this.errors).length > 0;
	}

	add(errors) {
		this.errors = errors;
	}

	clear(field) {
		if (field) {
			delete this.errors[field];

			return;
		}
	}

}