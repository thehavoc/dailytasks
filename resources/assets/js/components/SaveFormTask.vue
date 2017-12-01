<template>
	<div class="add-task">
		<form @keydown="$store.dispatch('errors/clear')">
			<div class="form-group">
				<label>Title</label>

				<input type="text" name="title" class="form-control" v-model="task.title">
				<div class="alert alert-danger" v-show="getError('title')" v-text="getError('title')"></div>
			</div>

			<div class="form-group">
				<label>Description</label>

				<textarea class="form-control" name="description" v-model="task.description"></textarea>
				<div class="alert alert-danger" v-show="getError('description')" v-text="getError('description')"></div>
			</div>
	
			<div class="form-group">
				<label>Date</label>

				<datepicker :value="task.added_to" v-on:selected="setTaskDate" input-class="form-control"></datepicker>

				<div class="alert alert-danger" v-show="getError('added_to')" v-text="getError('added_to')"></div>
			</div>

			<div class="form-group" v-if="timeslots.length">
				<label>Time slot</label>

				<select name="time_slot" v-model="task.time_slot">
					<option v-for="slot in timeslots" :value="slot">
						{{ slot }}
					</option>					
				</select>
			</div>
			
			<a :href="tasksUrl" class="btn btn-default pull-right">Go to tasks</a>
		</form>
	</div>

</template>

<script>
	/**
	 * This is a child component that displays all main task fields. The `task` prop must be used.
	 */
	import TasksMixin from '../mixins/tasks.js';
	
	import Route from '../route/index.js';

	export default {
		mixins: [TasksMixin],		

		props: ['task'],

		/**
		 * Initialize the route class.
		 * Prepare the tasks URL.
		 * Load the time slots to the form.
		 */
		mounted() {
			this.route = new Route();

			this.tasksUrl = this.route.getUrl('tasksUrl', 'web')

			this.getTimeSlots();			
		},


		data() {
			return {
				tasksUrl: '',
				timeslots: []
			}
		},
		
		methods: {
			/**
			 * Prepare the time slots.
			 * @return {Array} this.timeslots
			 */
			getTimeSlots: function(){
				var first_slot = 8;
				var last_slot = 19

				var intervals = [
					'00',
					'30'
				];

				for (let i = first_slot; i <= last_slot; i++) {
					let time = i

					if(time < 10) {
						time = '0' + time;
					}

					for (let j = 0; j < intervals.length; j++) {
						this.timeslots.push(time + ':' + intervals[j] );
					}
				}

				return this.timeslots;
			},

			/**
			 * Set the task date.
			 * @param {String} date
			 * @return {String} this.task.added_to
			 */
			setTaskDate: function(date) {
				return this.task.added_to = this.formatDate(date);
			},		
		}
	}
</script>
