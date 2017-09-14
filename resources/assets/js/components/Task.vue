<template>
	<div class="user-task">            
		<div class="task-heading" v-bind:class="[showDescription ? 'expanded-task' : '']">
			<a href="#" v-on:click="toggleDescription" v-bind:class="[task.completed ? 'completed-task-text' : '']">
				<span class="glyphicon" v-show="task.description" v-bind:class="[showDescription ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-right']"></span>

				{{ task.title }}
			</a>

			<input v-on:click="changeCompleteStatus(task)" :checked="task.completed"  type="checkbox" class="pull-right" />
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

				if(this.task.description) {
					this.showDescription = !this.showDescription;
				}
			}
		}      
	}
</script>
