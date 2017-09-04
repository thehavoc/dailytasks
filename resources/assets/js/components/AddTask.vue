<template>
	<div class="add-task">
		Form
	</div>

</template>

<script>

	import TasksMixin from '../mixins/Tasks.js';
	import Datepicker from 'vuejs-datepicker';
	import ApiTasks from '../api/tasks.js';
	

	export default {
		mixins: [TasksMixin],

		components: { Datepicker },

		mounted() {
			this.api = new ApiTasks();

		},

		data() {
			return {

			}
		},

		methods: {
		},

		computed: {
		},

		watch: {
		}

	}
</script>
