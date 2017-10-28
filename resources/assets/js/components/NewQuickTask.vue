<template>
	<div class="add-task row">
		<div class="col-md-12">
			<form class="add-task-form" @keydown="errors.clear($event.target.name)">
				<div class="form-group">
					<input type="text" v-model="task.title" class="form-control text-field" placeholder="Title">

					<div class="alert alert-danger" v-show="errors.get('title')" v-text="errors.get('title')"></div>
					
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

					var vm = this;

					this.$store.dispatch('tasks/addTask', this.task).then(function() {
						vm.task.title = ''
					});
				}
			}
		}      
	}
</script>
