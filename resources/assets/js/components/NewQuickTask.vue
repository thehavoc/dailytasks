<template>
	<div class="add-task row">
		<div class="col-md-12">
			<form class="add-task-form">
				<div class="form-group">
					<input type="text" v-model="task.title" class="form-control text-field" placeholder="Title">
					
					<button v-on:click="addTask" class="btn btn-success">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>

	import TasksMixin from '../mixins/tasks.js';

	export default {
		props: ['date'],

		mixins: [TasksMixin],

		data() {
			return {
				task: Object,
			}
		},

		mounted() {
			this.executeDefaultAddTaskActions();
		},

		methods: {

			addTask: function(e) {
				e.preventDefault();

				if(this.task.title) {

					this.task.added_to = this.date;
					this.api.addTask(this.addTaskCallback, this.task);					
				}
			},

			addTaskCallback: function(response) {
				this.$emit('addedTask', response);
				this.task.title = '';

				this.$store.commit('notification/changeMessage', 'A new task has been added.');
			}
		}      
	}
</script>
