<template>
	<div class="user-tasks">
		<datepicker 
			:value="date" 
			v-on:selected="setDate" 
			input-class="form-control"
		/>
		
		<NewQuickTask :date="date"/>
		
		<div class="tasks-list" v-if="tasks[0]">
			<UserTasksList 
				title="Active tasks" 
				:tasks="todo" 
			/>
			
			<UserTasksList 
				title="Completed tasks" 
				:tasks="completed"
			/>
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
	import UserTasksList from './UserTasksList.vue';
	import TasksMixin from '../mixins/tasks.js';

	export default {
		mixins: [
			TasksMixin
		],

		components: { 
			NewQuickTask, 
			UserTasksList 
		},

		/**
		 * Execute the default Task actions from a mixin.
		 * Get the add tasks URL.
		 * Dispatch a request to the store to get all tasks of the current logged-in user.
		 */
		created() {
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
			 * @return {Number}
			 */
			sort(tasks) {
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
				let tasks = this.tasks.filter((task) => {
					return task.completed;
				});

				return this.sort(tasks);
			},

			/**
			 * Prepare the todo tasks.
			 * @return {Object}
			 */
			todo() {
				let tasks = this.tasks.filter((task) => {
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
