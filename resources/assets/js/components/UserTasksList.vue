<template>
	<div>
		<h5>{{ title }} <span>({{ tasks.length }})</span></h5>

		<ul class="list-group">
			<li class="list-group-item" v-for="task in tasks" :key="task.id">
				<UserTasksListItem :task="task"/>
			</li>
		</ul>                
	</div>
</template>

<script>
	/**
	 * A child component that displays all tasks into a list. The `tasks` prop must be used.
	 */
	import UserTasksListItem from './UserTasksListItem.vue';

	export default {
		props: {
			tasks: Array,
			title: String
		},

		components: {
			UserTasksListItem
		}
	}
</script>
