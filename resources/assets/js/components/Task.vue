<template>
	<div class="user-task">            
		<div class="task-heading" v-bind:class="[showDescription ? 'expanded-task' : '']">
			<a href="#" v-on:click="toggleDescription" v-bind:class="[task.completed ? 'completed-task-text' : '']">{{ task.title }}</a>

			<button v-on:click="changeCompleteStatus(task)" class="pull-right btn btn-primary btn-xs">{{ button }}</button>		
		</div>

		<div class="task-description">
			<p v-show="showDescription && task.description">
				{{ task.description }}
			</p>
		</div>
	</div>
</template>

<script>

	import ApiTasks from '../api/tasks.js';

	export default {
		props: ['task'],

		mounted() {
			this.api = new ApiTasks();
		},

		data() {
			return {
				showDescription: false
			}
		},

		methods: {
			changeCompleteStatus: function(task, status) {
				task.completed = !task.completed;
				this.api.updateTask(this.updateTaskCallback, task);
			},
			
			updateTaskCallback(response) {
				// Flash message
			},

			toggleDescription(e) {
				e.preventDefault();

				this.showDescription = !this.showDescription;
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
