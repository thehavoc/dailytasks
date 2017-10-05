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
	import TasksMixin from '../mixins/tasks.js';

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
			},
			sortTasks: function(tasks) {
				if(tasks) {
					return tasks.sort(function (a, b) {
						if(a.time_slot === null){
							return 1;
						}
						
						if(b.time_slot === null){
							return -1;
						}

						if (parseInt(a.time_slot.split(":")[0]) - parseInt(b.time_slot.split(":")[0]) === 0) {
							return parseInt(a.time_slot.split(":")[1]) - parseInt(b.time_slot.split(":")[1]);
						} else {
							return parseInt(a.time_slot.split(":")[0]) - parseInt(b.time_slot.split(":")[0]);
						}
					});
				}

				return tasks;				
			}
		},

		computed: {
			completedTasks: function () {

				var tasks = this.tasks.filter(function (task) {
					return task.completed;
				});

				return this.sortTasks(tasks);
			},

			todoTasks: function () {
				var tasks = this.tasks.filter(function (task) {
					return !task.completed;
				})

				return this.sortTasks(tasks);
			},            
		},

		watch: {
			date: function(newDate) {
				this.fetchTasks();				
			}
		}

	}
</script>
