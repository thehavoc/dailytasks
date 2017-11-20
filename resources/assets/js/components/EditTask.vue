<template>
	<div>
		<SaveFormTask :task="task"></SaveFormTask>

		<button v-on:click="edit" class="btn btn-success" :disabled="hasErrors()">Edit</button>
	</div>
</template>

<script>	
	/**
	 * Render the Edit a Task form. 
	 * Load a child component that includes the main task fields.
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
		 * Load the data of an edited task.
		 */
		mounted() {
			var vm = this;

			this.$store.dispatch('tasks/task', this.getId()).then(function(res) {
				vm.task = res;
			});
		},

		methods: {
			/**
			 * Dispatch a request to the store to update a task.
			 * @param {Object} event
			 * @return {Promise}
			 */
			edit: function(event) {
				event.preventDefault();

				return this.$store.dispatch('tasks/update', this.task);
			},

			/**
			 * Get the ID from a visited edit task URL.
			 * @return {Integer}
			 */				
			getId: function() {
				return window.location.href.substr(window.location.href.lastIndexOf('/') + 1);			
			}
		}
	}
</script>
