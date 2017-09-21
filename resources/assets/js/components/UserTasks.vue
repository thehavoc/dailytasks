<template>
	<div class="user-tasks">
		<datepicker :value="date" v-on:selected="fetchDateTasks" input-class="form-control"></datepicker>
		
		<NewQuickTask :date="date" @addedTask="addTask"></NewQuickTask>
		
		<div class="tasks-list" v-if="tasks[0]">
			<TasksList title="Active tasks" :tasks="todoTasks"></TasksList>
			
			<TasksList title="Completed tasks" :tasks="completedTasks"></TasksList>
		</div>

		<div v-else>
			<p class="text-center">
				There are no available tasks for this day. Please add a task by using the above form or visiting <a :href="addTaskUrl">the Add Task page</a>.
			</p>
		</div>
	</div>
</template>

<script>	
	import ApiTasks from '../api/tasks.js';
	import NewQuickTask from './NewQuickTask.vue';
	import TasksList from './TasksList.vue';
	import TasksMixin from '../mixins/Tasks.js';

	export default {
		mixins: [TasksMixin],

		components: { NewQuickTask, TasksList },

		mounted() {
			this.executeDefaultAddTaskActions();

			this.addTaskUrl = this.route.getUrl('addTask', 'web')
			this.fetchTasks();
		},

		data() {
			return {
				tasks: [],
				date: this.getCurrentDate(),
				addTaskUrl: ''
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
