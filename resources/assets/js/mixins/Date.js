import moment from 'moment'

export default {
	
	methods: {

		getCurrentDate: function() {
			return moment().format(this.getDateFormat());
		},

		formatDate: function(date) {
			return moment(date).format(this.getDateFormat());
		},

		getDateFormat: function() {
			return 'YYYY-MM-DD';
		}
	}

}