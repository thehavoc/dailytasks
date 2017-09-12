<template>
	<div>
		<h5>{{ title }} <span>({{ tasks.length }})</span></h5>

		<ul class="list-group">
			<li class="list-group-item" v-for="task in tasks">
				<Task :task="task"></Task>
			</li>
		</ul>                
	</div>

</template>

<script>

	import Task from './Task.vue';

	export default {
		props: ['tasks', 'title'],

		components: { Task },
	}

</script>
