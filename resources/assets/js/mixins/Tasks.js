import moment from 'moment'
import ApiTasks from '../api/tasks.js';	
import Datepicker from 'vuejs-datepicker';

export default {
	
	components: { Datepicker },

	methods: {

		getCurrentDate: function() {
			return moment().format(this.getDateFormat());
		},

		formatDate: function(date) {
			return moment(date).format(this.getDateFormat());
		},

		getDateFormat: function() {
			return 'YYYY-MM-DD';
		},

	    getDefaultTaskProperties() {
	        return {
	            title: '',
	            added_to: '',
	            completed: 0
	        }
	    },

	    executeDefaultAddTaskActions() {
			this.api = new ApiTasks();
			this.task = this.getDefaultTaskProperties();	    	
	    }	

	}

}