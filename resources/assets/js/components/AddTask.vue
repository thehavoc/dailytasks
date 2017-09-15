<template>
	<div class="add-task">
		<form>
			<div class="form-group">
				<label>Title</label>

				<input type="text" class="form-control" v-model="task.title">
			</div>

			<div class="form-group">
				<label>Description</label>

				<textarea class="form-control" v-model="task.description"></textarea>
			</div>

			<div class="form-group">
				<label>Date</label>

				<datepicker :value="task.added_to" v-on:selected="setTaskDate" input-class="form-control"></datepicker>
			</div>

			<button v-on:click="addTask" class="btn btn-success">Submit</button>

			<a href="" class="btn btn-default pull-right">Got to tasks</a>
		</form>
	</div>

</template>

<script>
	import TasksMixin from '../mixins/Tasks.js';	
	
	export default {
		mixins: [TasksMixin],


		mounted() {
			this.executeDefaultAddTaskActions();
			this.task.added_to = this.getCurrentDate();
		},

		data() {
			return {
				task: Object,
			}
		},

		methods: {
			addTask: function(e) {
				e.preventDefault();

				this.api.addTask(this.addTaskCallback, this.task);					
			},
			setTaskDate: function(date) {
				this.task.added_to = this.formatDate(date);
			},
			addTaskCallback: function(response) {
				this.task = this.getDefaultTaskProperties();
				this.$store.commit('notification/changeMessage', 'A new task has been added.');
			}	
		}
	}
</script>
