<template>
	<div class="user-tasks">
		<h4>To do tasks</h4>
		<ul class="list-group">
			<li class="list-group-item" v-for="task in todoTasks">
				{{ task.title }}

				<button v-on:click="changeCompleteStatus(task, 1)" class="pull-right">Complete</button>
			</li>
		</ul>        

		<h4>Completed tasks</h4>
		<ul class="list-group">
			<li class="list-group-item" v-for="task in completedTasks">
				<span class="completed-task-text">{{ task.title }}</span>

				<button v-on:click="changeCompleteStatus(task, 0)" class="pull-right">Activate</button>
			</li>
		</ul>                
	</div>
</template>

<script>

	import ApiTasks from '../api/tasks.js';

	export default {
		mounted() {
			this.api = new ApiTasks();
			this.fetchTasks();
		},
		data() {
			return {
				tasks: []
			}
		},
		methods: {
			fetchTasks: function() {
				this.api.getTasks(this.getTasksCallback);
			},
			getTasksCallback: function(response) {
				this.tasks = response;
			},
			changeCompleteStatus: function(task, status) {
				task.completed = status;
				this.api.updateTask(this.updateTaskCallback, task);
			},
			updateTaskCallback(response) {

				// console.log(response);
			}
		},
		computed: {
			completedTasks: function () {
				return this.tasks.filter(function (task) {
					return task.completed;
				})
			},
			todoTasks: function () {
				return this.tasks.filter(function (task) {
					return !task.completed;
				})
			},            
		}        
	}
</script>
