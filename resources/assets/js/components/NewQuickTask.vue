<template>
	<div class="add-task row">
		<div class="col-md-12">
			<form class="add-task-form">
				<div class="form-group">
					<input type="text" v-model="task.title" class="form-control text-field" placeholder="Title">					
					
					<button v-on:click="add" class="btn btn-success">Submit</button>
				</div>
				
				<div class="alert alert-danger" v-show="getError('title')" v-text="getError('title')"></div>

			</form>
		</div>
	</div>
</template>

<script>
	/**
	 * This is a component that renders the Quick Add a Task form.
	 */
	import { mapActions } from 'vuex'
	import TasksMixin from '../mixins/tasks.js';

	export default {
		mixins: [
			TasksMixin
		],

		props: {
			date: String
		},

		data() {
			return {
				task: Object,
			}
		},
		/**
		 * Execute the default Task actions from a mixin.
		 */
		created() {
			this.executeDefaultAddTaskActions();
		},

		methods: {
			...mapActions('tasks', [
				'quickAdd'
			]),			

			/**
			 * Dispatch a request to the store to add a task.
			 * @param {Object} event
			 * @return {Promise}
			 */
			add(event) {
				event.preventDefault();

				this.task.added_to = this.date;

				return this.quickAdd(this.task).then(() => {
					this.task.title = ''
				});
			}
		}      
	}
</script>
