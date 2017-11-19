<template>
	<div class="add-task row">
		<div class="col-md-12">
			<form class="add-task-form" @keydown="$store.dispatch('errors/clear')">
				<div class="form-group">
					<input type="text" v-model="task.title" class="form-control text-field" placeholder="Title">					
					
					<button v-on:click="add" class="btn btn-success">Submit</button>
				</div>
				
				<div class="alert alert-danger" v-show="getError('title')" v-text="getError('title')"></div>

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

			add: function(e) {
				e.preventDefault();

				this.task.added_to = this.date;

				var vm = this;

				this.$store.dispatch('tasks/quickAdd', this.task).then(function() {
					vm.task.title = ''
				});
			}
		}      
	}
</script>
