import Route from '../route/index.js';
import ApiTasks from '../api/tasks.js';
import Datepicker from 'vuejs-datepicker';
import DateMixin from '../mixins/date.js';
import FormMixin from '../mixins/form.js';

export default {
	mixins: [ DateMixin, FormMixin ],
	components: { Datepicker },

	methods: {

	    getDefaultTaskProperties() {
	        return {
	            title: '',
	            added_to: this.getCurrentDate(),
	            completed: 0,
	            description: ''
	        }
	    },

	    executeDefaultAddTaskActions() {
			this.api = new ApiTasks();
			this.route = new Route();
			this.task = this.getDefaultTaskProperties();
	    }	

	}

}