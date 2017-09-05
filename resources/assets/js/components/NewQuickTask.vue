<template>
	<div class="add-task row">

		<div class="col-md-2">
			<button v-on:click="showForm = !showForm" class="btn btn-success btn-default add-task-btn">Add a quick task</button>
		</div>

		<div class="col-md-10">
			<form v-show="showForm" class="add-task-form form-inline">
				<div class="form-group">
					<input type="text" v-model="task.title" class="form-control" placeholder="Title">

					<button v-on:click="addTask" class="btn btn-default">Submit</button>
				</div>
			</form>
		</div>
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
				task: Object,

				showForm: false
			}
		},

		mounted() {
			this.api = new ApiTasks();
			this.task = this.getDefaultTaskProperties();
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
