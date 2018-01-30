<template>
	<div>
		<transition name="fade" v-on:enter="enter">
			<div class="notification-box alert alert-success" role="alert" v-if="message">
				{{ message }}
			</div>
		</transition>
	</div>
</template>

<script>
	/**
	 * This is a component that shows a box with a message when an action completes.
	 */			
	import { mapGetters, mapActions } from 'vuex'

	export default {
		methods: {
			...mapActions('notification', [
				'update',
			]),			

			/**
			 * Dispatch a request to the store to clear the notification message.
			 * @return void
			 */		
			enter() {
				setTimeout(() => {
					this.update('');
				}, 2000);
			}
		},

		computed: {
			...mapGetters('notification', [
				'message'
			])
		}
	}	
</script>