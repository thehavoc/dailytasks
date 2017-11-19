<template>
	<div class="user-tasks">
		<datepicker :value="date" v-on:selected="fetch" input-class="form-control"></datepicker>
		
		<NewQuickTask :date="date"></NewQuickTask>
		
		<div class="tasks-list" v-if="tasks[0]">
			<TasksList title="Active tasks" :tasks="todo"></TasksList>
			
			<TasksList title="Completed tasks" :tasks="completed"></TasksList>
		</div>

		<div v-else>
			<p class="text-center">
				There are no available tasks for this day. Please add a task by using the above form or visiting <a :href="addTaskUrl">the Add Task page</a>.
			</p>
		</div>
	</div>
</template>

<script>
	import NewQuickTask from './NewQuickTask.vue';
	import TasksList from './TasksList.vue';
	import TasksMixin from '../mixins/tasks.js';

	export default {
		mixins: [TasksMixin],

		components: { NewQuickTask, TasksList },

		mounted() {
			this.executeDefaultAddTaskActions();

			this.addTaskUrl = this.route.getUrl('addTask', 'web')

			this.$store.dispatch('tasks/get', this.date);
		},

		data() {
			return {
				date: this.getCurrentDate(),
				addTaskUrl: ''
			}
		},

		methods: {
			fetch: function(newDate) {
				newDate = this.formatDate(newDate);
				this.date = newDate;								
			},			
			sort: function(tasks) {
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
			tasks: function() {
				return this.$store.getters['tasks/tasks'];
			},
			completed: function () {

				var tasks = this.tasks.filter(function (task) {
					return task.completed;
				});

				return this.sort(tasks);
			},

			todo: function () {
				var tasks = this.tasks.filter(function (task) {
					return !task.completed;
				})

				return this.sort(tasks);
			},            
		},

		watch: {
			date: function(newDate) {
				this.$store.dispatch('tasks/get', this.date);
			}
		}

	}
</script>
