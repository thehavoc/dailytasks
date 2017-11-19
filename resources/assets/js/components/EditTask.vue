<template>
	<div>
		<SaveFormTask :task="task"></SaveFormTask>

		<button v-on:click="editTask" class="btn btn-success" :disabled="hasErrors()">Edit</button>
	</div>
</template>

<script>	
	import TasksMixin from '../mixins/tasks.js';
	
	import SaveFormTask from './SaveFormTask.vue';

	export default {
		mixins: [TasksMixin],

		components: { SaveFormTask },

		data() {
			return {
				task: Object,
			}
		},

		mounted() {
			var vm = this;

			this.$store.dispatch('tasks/task', this.getTaskId()).then(function(res) {
				vm.task = res;
			});
		},

		methods: {
			editTask: function(e) {
				e.preventDefault();

				this.$store.dispatch('tasks/update', this.task);
			},
			getTaskId: function() {
				return window.location.href.substr(window.location.href.lastIndexOf('/') + 1);			
			}
		}
	}
</script>
