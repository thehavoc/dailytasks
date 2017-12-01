<template>
	<div>
		<SaveFormTask :task="task"></SaveFormTask>

		<button v-on:click="add" class="btn btn-success" :disabled="hasErrors()">Submit</button>
	</div>
</template>

<script>
	/**
	 * This is a component that renders the Add a Task main form.
	 * It loads the SaveFormTask component that includes the main task fields.
	 */
	import TasksMixin from '../mixins/tasks.js';
	import SaveFormTask from './SaveFormTask.vue';
	
	export default {
		mixins: [TasksMixin],

		components: { SaveFormTask },
		
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
		mounted() {
			this.executeDefaultAddTaskActions();

			this.tasksUrl = this.route.getUrl('tasksUrl', 'web')
			
			this.task.added_to = this.getCurrentDate();			
		},

		methods: {
			/**
			 * Dispatch a request to the store to add a task.
			 * @param {Object} event
			 * @return {Promise}
			 */
			add: function(event) {
				event.preventDefault();

				var vm = this;

				return this.$store.dispatch('tasks/add', this.task).then(function() {
					vm.task = vm.getDefaultTaskProperties();
				});
			}
		}
	}
</script>
