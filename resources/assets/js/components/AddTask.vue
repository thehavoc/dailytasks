<template>
	<div>
		<SaveFormTask :task="task"/>

		<button v-on:click="add" class="btn btn-success" :disabled="hasErrors()">Submit</button>
	</div>
</template>

<script>
	/**
	 * This is a component that renders the Add a Task main form.
	 * It loads the SaveFormTask component that includes the main task fields.
	 */
	import { mapActions } from 'vuex';
	import TasksMixin from '../mixins/tasks.js';
	import SaveFormTask from './SaveFormTask.vue';
	
	export default {
		mixins: [
			TasksMixin
		],

		components: { 
			SaveFormTask
		},
		
		data() {
			return {
				task: Object,
			}
		},

		/**
		 * Execute the default Task actions from a mixin.
		 * Get the web tasks URL.
		 * Set a default task date.
		 */
		created() {
			this.executeDefaultAddTaskActions();

			this.tasksUrl = this.route.getUrl('tasksUrl', 'web')
			
			this.task.added_to = this.getCurrentDate();			
		},

		methods: {
			...mapActions('tasks', [
				'create',
			]),	

			/**
			 * Dispatch a request to the store to add a task.
			 * @param {Object} event
			 * @return {Promise}
			 */
			add(event) {
				event.preventDefault();

				return this.create(this.task).then(() => {
					this.getDefaultTaskProperties();
				});
			}
		}
	}
</script>