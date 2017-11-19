<template>
	<div class="user-task" v-bind:class="[past ? 'past-task' : '']">            
		<div class="task-heading row" v-bind:class="[showDescription ? 'expanded-task' : '']">
			<div class="col-md-8">
				<a href="#" class="task-title" v-on:click="toggleDescription" v-bind:class="[task.completed ? 'completed-task-text' : '']">
					<span class="glyphicon" v-show="task.description" v-bind:class="[showDescription ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-right']"></span>

					{{ task.title }}
				</a>
			</div>

			<div class="col-md-4">

				<input v-on:click="changeStatus(task)" :checked="task.completed"  type="checkbox" class="pull-right" />

				<span class="pull-right task-time-slot" v-if="task.time_slot">{{ task.time_slot }}</span>

				<span class="task-actions pull-right">
					<button v-on:click="remove" class="btn btn-danger btn-xs">Delete</button>
					<a class="btn btn-primary btn-xs" :href="editUrl">Edit</a>
				</span>

			</div>

		</div>

		<div class="task-description">
			<p v-show="showDescription && task.description">
				{{ task.description }}
			</p>
		</div>
	</div>
</template>

<script>

	import TasksMixin from '../mixins/tasks.js';
	import Route from '../route/index.js';

	export default {
		mixins: [TasksMixin],

		props: ['task'],

		data() {
			return {
				showDescription: false,
				editUrl: ''				
			}
		},

		mounted() {
			this.route = new Route();
			this.editUrl = this.route.getUrl('editTask', 'web') + '/' + this.task.id;
		},		

		methods: {
			changeStatus: function(task, status) {
				task.completed = !task.completed;
				this.$store.dispatch('tasks/update', task);				
			},

			remove() {
				this.$store.dispatch('tasks/delete', this.task)
			},
			
			toggleDescription(e) {
				e.preventDefault();

				if(this.task.description) {
					this.showDescription = !this.showDescription;
				}
			},		

		},
		computed: {
			past: function() {
				return this.pastTask();
			}
		}
	}
</script>
