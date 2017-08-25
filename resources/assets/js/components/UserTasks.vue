<template>
	<div class="user-tasks">
		<h4>To do tasks</h4>
		<ul class="list-group">
			<li class="list-group-item" v-for="task in todoTasks">
				<Task :task="task"></Task>
			</li>
		</ul>        

		<h4>Completed tasks</h4>
		<ul class="list-group">
			<li class="list-group-item" v-for="(task, index) in completedTasks">
				<Task :task="task"></Task>
			</li>
		</ul>                
	</div>
</template>

<script>

	import ApiTasks from '../api/tasks.js';
	import Task from './Task.vue';

	export default {
		components: { Task },

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
