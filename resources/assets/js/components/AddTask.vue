<template>
	<div class="add-task">
		<form @keydown="errors.clear($event.target.name)">
			<div class="form-group">
				<label>Title</label>

				<input type="text" name="title" class="form-control" v-model="task.title">
				<div class="alert alert-danger" v-show="errors.get('title')" v-text="errors.get('title')"></div>
			</div>

			<div class="form-group">
				<label>Description</label>

				<textarea class="form-control" name="description" v-model="task.description"></textarea>
				<div class="alert alert-danger" v-show="errors.get('description')" v-text="errors.get('description')"></div>
			</div>

			<div class="form-group">
				<label>Date</label>

				<datepicker :value="task.added_to" v-on:selected="setTaskDate" input-class="form-control"></datepicker>

				<div class="alert alert-danger" v-show="errors.get('added_to')" v-text="errors.get('added_to')"></div>
			</div>

			<button v-on:click="addTask" class="btn btn-success" :disabled="errors.any()">Submit</button>
			
			<a :href="tasksUrl" class="btn btn-default pull-right">Go to tasks</a>
		</form>
	</div>

</template>

<script>	
	import TasksMixin from '../mixins/tasks.js';
	
	export default {
		mixins: [TasksMixin],


		mounted() {
			this.executeDefaultAddTaskActions();
			this.tasksUrl = this.route.getUrl('tasksUrl', 'web')
			this.task.added_to = this.getCurrentDate();
		},

		data() {
			return {
				task: Object,
				tasksUrl: ''
			}
		},

		methods: {
			addTask: function(e) {
				e.preventDefault();

				this.api.addTask(this.addTaskCallback, this.task, this.errorsCallback);
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
