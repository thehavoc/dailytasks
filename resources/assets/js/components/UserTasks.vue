<template>
	<div class="user-tasks">
		
		<datepicker :value="date" v-on:selected="fetchDateTasks" input-class="form-control"></datepicker>
		
		<NewQuickTask :date="date" @addedTask="addTask"></NewQuickTask>

		<div class="tasks-list">
			<h4>To do tasks</h4>

			<ul class="list-group">
				<li class="list-group-item" v-for="task in todoTasks">
					<Task :task="task"></Task>
				</li>
			</ul>        

			<h4>Completed tasks</h4>

			<ul class="list-group">
				<li class="list-group-item" v-for="task in completedTasks">
					<Task :task="task"></Task>
				</li>
			</ul>                
		</div>
	</div>

</template>

<script>

	import ApiTasks from '../api/tasks.js';
	import Task from './Task.vue';
	import NewQuickTask from './NewQuickTask.vue';
	import TasksMixin from '../mixins/Tasks.js';
	import Datepicker from 'vuejs-datepicker';
	

	export default {
		mixins: [TasksMixin],

		components: { Task, NewQuickTask, Datepicker },

		mounted() {
			this.api = new ApiTasks();

			this.fetchTasks();
		},

		data() {
			return {
				tasks: [],
				date: this.getCurrentDate()
			}
		},

		methods: {
			fetchTasks: function() {
				this.api.getTasks(this.getTasksCallback, this.date);
			},

			fetchDateTasks: function(newDate) {
				newDate = this.formatDate(newDate);
				this.date = newDate;
			},

			getTasksCallback: function(response) {
				this.tasks = response;
			},

			addTask: function(task) {
				this.tasks.push(task);
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
		},

		watch: {
			date: function(newDate) {
				this.fetchTasks();				
			}
		}

	}
</script>
