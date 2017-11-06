<template>
	<div>
		<SaveFormTask :task="task"></SaveFormTask>

		<button v-on:click="addTask" class="btn btn-success" :disabled="hasErrors()">Submit</button>
	</div>
</template>

<script>	
	import TasksMixin from '../mixins/tasks.js';
	import SaveFormTask from './SaveFormTask.vue';
	
	export default {
		mixins: [TasksMixin],

		data() {
			return {
				task: Object,
			}
		},

		components: { SaveFormTask },

		mounted() {
			this.executeDefaultAddTaskActions();
			this.tasksUrl = this.route.getUrl('tasksUrl', 'web')
			this.task.added_to = this.getCurrentDate();			
		},

		methods: {
			addTask: function(e) {
				e.preventDefault();

				var vm = this;

				this.$store.dispatch('tasks/addTask', this.task).then(function() {
					vm.task = vm.getDefaultTaskProperties();
				});
			},
			setTaskDate: function(date) {
				this.task.added_to = this.formatDate(date);
			}
		}
	}
</script>
