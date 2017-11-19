<template>
	<div>
		<SaveFormTask :task="task"></SaveFormTask>

		<button v-on:click="add" class="btn btn-success" :disabled="hasErrors()">Submit</button>
	</div>
</template>

<script>
	/**
	 * The component that renders the Add a Task main form.
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
		 * Execute the default Task actions from TasksMixin;
		 * get the web tasks URL;
		 * set a default task date.
		 */
		mounted() {
			this.executeDefaultAddTaskActions();
			this.tasksUrl = this.route.getUrl('tasksUrl', 'web')
			this.task.added_to = this.getCurrentDate();			
		},

		methods: {
			/**
			 * Show/hide the description of the task.
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
