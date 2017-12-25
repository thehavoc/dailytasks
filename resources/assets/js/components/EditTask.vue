<template>
	<div>
		<SaveFormTask :task="task"></SaveFormTask>

		<button v-on:click="edit" class="btn btn-success" :disabled="hasErrors()">Edit</button>
	</div>
</template>

<script>	
	/**
	 * This a component that renders the Edit a Task form. 
	 * It also loads a child component that includes the main task fields.
	 */
	import { mapActions } from 'vuex'
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
		created() {
			this.getTask(this.getId()).then((res) => {
				this.task = res;
			});
		},

		methods: {
			...mapActions('tasks', [
				'getTask',
				'update'
			]),			

			/**
			 * Dispatch a request to the store to update a task.
			 * @param {Object} event
			 * @return {Promise}
			 */
			edit(event) {
				event.preventDefault();

				return this.update(this.task);
			},

			/**
			 * Get the ID from a visited edit task URL.
			 * @return {Integer}
			 */				
			getId() {
				return window.location.href.substr(window.location.href.lastIndexOf('/') + 1);			
			}
		}
	}
</script>
