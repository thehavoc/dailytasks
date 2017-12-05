<template>
	<div class="user-tasks">
		<datepicker :value="date" v-on:selected="setDate" input-class="form-control"></datepicker>
		
		<NewQuickTask :date="date"></NewQuickTask>
		
		<div class="tasks-list" v-if="tasks[0]">
			<TasksList title="Active tasks" :tasks="todo"></TasksList>
			
			<TasksList title="Completed tasks" :tasks="completed"></TasksList>
		</div>

		<div v-else>
			<p class="text-center">
				There are no available tasks for this day. Please add a task by using the above form or visiting <a :href="addTaskUrl">the Add Task page</a>.
			</p>
		</div>
	</div>
</template>

<script>
	/**
	 * The main listing component that displays both todo and completed tasks.
	 */
	import { mapGetters, mapActions } from 'vuex';
	import NewQuickTask from './NewQuickTask.vue';
	import TasksList from './TasksList.vue';
	import TasksMixin from '../mixins/tasks.js';

	export default {
		mixins: [TasksMixin],

		components: { NewQuickTask, TasksList },

		/**
		 * Execute the default Task actions from a mixin.
		 * Get the add tasks URL.
		 * Dispatch a request to the store to get all tasks of the current logged-in user.
		 */
		mounted() {
			this.executeDefaultAddTaskActions();
			
			this.addTaskUrl = this.route.getUrl('addTask', 'web')

			this.getTasks(this.date);
		},

		data() {
			return {
				date: this.getCurrentDate(),
				addTaskUrl: ''
			}
		},

		methods: {
			...mapActions('tasks', [
				'getTasks'
			]),

			/**
			 * Set a date
			 * @param {String} newDate
			 * @return {String}
			 */
			setDate(newDate) {
				newDate = this.formatDate(newDate);

				return this.date = newDate;
			},

			/**
			 * Sort the tasks by time slots
			 * @param {Object} tasks
			 * @return {Object}
			 */
			sort(tasks) {
				if(tasks) {
					return tasks.sort(function (a, b) {
						if(a.time_slot === null){
							return 1;
						}
						
						if(b.time_slot === null){
							return -1;
						}

						if (parseInt(a.time_slot.split(":")[0]) - parseInt(b.time_slot.split(":")[0]) === 0) {
							return parseInt(a.time_slot.split(":")[1]) - parseInt(b.time_slot.split(":")[1]);
						} else {
							return parseInt(a.time_slot.split(":")[0]) - parseInt(b.time_slot.split(":")[0]);
						}
					});
				}

				return tasks;				
			}
		},

		computed: {
			...mapGetters('tasks', [
				'tasks'
			]),

			/**
			 * Prepare the completed tasks.
			 * @return {Object}
			 */
			completed() {
				var tasks = this.tasks.filter(function (task) {
					return task.completed;
				});

				return this.sort(tasks);
			},

			/**
			 * Prepare the todo tasks.
			 * @return {Object}
			 */
			todo() {
				var tasks = this.tasks.filter(function (task) {
					return !task.completed;
				})

				return this.sort(tasks);
			},            
		},

		watch: {
			/**
			 * Dispatch a request to the store to get the logged-in user's tasks of a selected date.
			 * @return {Promise}
			 */			
			date(newDate) {
				return this.getTasks(this.date);
			}
		}

	}
</script>
