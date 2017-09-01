<template>
	<div class="add-task">

		<button v-on:click="showForm = !showForm" class="btn btn-success btn-default pull-left show-task-form">Add a quick daily task</button>
				
		<form v-show="showForm" class="form-inline add-task-form">
			<div class="form-group">
				<input type="text" v-model="task.title" class="form-control" placeholder="Title">
			</div>

			<button v-on:click="addTask" class="btn btn-default">Submit</button>
		</form>
	</div>
</template>

<script>

	import ApiTasks from '../api/tasks.js';
	import TasksMixin from '../mixins/Tasks.js';

	export default {
		props: ['date'],

		mixins: [TasksMixin],

		data() {
			return {
				task: {
					title: '',
					added_to: '',
					completed: 0
				},

				showForm: false
			}
		},

		mounted() {
			this.api = new ApiTasks();
		},

		methods: {

			addTask: function(e) {
				e.preventDefault();

				if(this.task.title) {

					this.task.added_to = this.date;
					this.api.addTask(this.addTaskCallback, this.task);					
				}
			},

			addTaskCallback: function(response) {
				this.$emit('addedTask', response);
				this.task.title = '';
				// Flash message
			}
		},

		computed: {

		}        
	}
</script>
