<template>
	<div class="user-task">            
		<span v-bind:class="[task.completed ? 'completed-task-text' : '']">{{ task.title }}</span>

		<button v-on:click="changeCompleteStatus(task)" class="pull-right btn btn-primary btn-xs">{{ button }}</button>		
	</div>
</template>

<script>

	import ApiTasks from '../api/tasks.js';

	export default {
		props: ['task'],

		mounted() {
			this.api = new ApiTasks();
		},

		methods: {
			changeCompleteStatus: function(task, status) {
				task.completed = !task.completed;
				this.api.updateTask(this.updateTaskCallback, task);
			},
			
			updateTaskCallback(response) {
				// Flash message
			}
		},

		computed: {
			button: function () {

				if(this.task.completed) {
					return 'Active';
				}

				return 'Complete';
			},
		}        
	}
</script>
