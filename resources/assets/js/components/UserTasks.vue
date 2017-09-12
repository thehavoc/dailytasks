<template>
	<div class="user-tasks">
		
		<datepicker :value="date" v-on:selected="fetchDateTasks" input-class="form-control"></datepicker>
		
		<NewQuickTask :date="date" @addedTask="addTask"></NewQuickTask>
		
		<div class="tasks-list" v-if="tasks[0]">
			<h5>Active tasks</h5>

			<ul class="list-group">
				<li class="list-group-item" v-for="task in todoTasks">
					<Task :task="task"></Task>
				</li>
			</ul>        

			<h5>Completed tasks</h5>

			<ul class="list-group">
				<li class="list-group-item" v-for="task in completedTasks">
					<Task :task="task"></Task>
				</li>
			</ul>                
		</div>
		<div v-else>
			<p class="text-center">There are no available tasks for this day. Please add a task by using the above form or visiting <a href="#">the Add Task page</a>.</p>
		</div>
	</div>

</template>

<script>

	import ApiTasks from '../api/tasks.js';
	import Task from './Task.vue';
	import NewQuickTask from './NewQuickTask.vue';
	import TasksMixin from '../mixins/Tasks.js';
	import Datepicker from 'vuejs-datepicker';
	import Message from '../api/tasks.js';

	export default {
		mixins: [TasksMixin],

		components: { Task, NewQuickTask, Datepicker },

		mounted() {
			this.api = new ApiTasks();

			// commit text

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
