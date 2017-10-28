import Route from '../route/index.js';
import ApiTasks from '../api/tasks.js';
import Datepicker from 'vuejs-datepicker';
import DateMixin from '../mixins/date.js';
import FormMixin from '../mixins/form.js';
import moment from 'moment';

export default {
	mixins: [ DateMixin, FormMixin ],
	components: { Datepicker },

	methods: {

		getDefaultTaskProperties() {
			return {
				title: '',
				added_to: this.getCurrentDate(),
				completed: 0,
				time_slot: '',
				description: ''
			}
		},

		pastTask() {
			var time = '23:59';

			if(this.task.time_slot) {
				time = this.task.time_slot;
			}

			if(moment(this.task.added_to + ' ' + time).diff(moment()) < 0) {
				return true;
			}

			return false;
		},

		executeDefaultAddTaskActions() {
			this.api = new ApiTasks();
			this.route = new Route();
			this.task = this.getDefaultTaskProperties();
		}	

	}

}