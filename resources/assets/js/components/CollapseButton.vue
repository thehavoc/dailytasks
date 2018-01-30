<template>
	<div>
		<button type="button" :class="classes" v-on:click="toggle">
			<slot></slot>
		</button>		
	</div>
</template>

<script>
	/**
	 * This is a component that shows a button that collapses a section. The `id` prop must be used.
	 */
	export default {
		props: {
			id: String,
			classes: String
		},

		methods: {
			toggle(event) {
				let element = document.getElementById(this.id);
				if(element) {
					element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
				}
			}
		}
	}
</script>