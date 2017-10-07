<template>
	<div class="user-task" v-bind:class="[past ? 'past-task' : '']">            
		<div class="task-heading" v-bind:class="[showDescription ? 'expanded-task' : '']">
			<a href="#" class="task-title" v-on:click="toggleDescription" v-bind:class="[task.completed ? 'completed-task-text' : '']">
				<span class="glyphicon" v-show="task.description" v-bind:class="[showDescription ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-right']"></span>

				{{ task.title }}
			</a>


			<input v-on:click="changeCompleteStatus(task)" :checked="task.completed"  type="checkbox" class="pull-right" />

			<span class="pull-right task-time-slot" v-if="task.time_slot">{{ task.time_slot }}</span>

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
	import TasksMixin from '../mixins/tasks.js';

	export default {
		mixins: [TasksMixin],

		props: ['task'],

		mounted() {
			this.api = new ApiTasks();
			console.log('32131');
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
				this.$store.commit('notification/changeMessage', 'The task has been updated.');
			},

			toggleDescription(e) {
				e.preventDefault();

				if(this.task.description) {
					this.showDescription = !this.showDescription;
				}
			},		

		},
		computed: {
			past: function() {
				return this.pastTask();
			}
		}
	}
</script>
