<template>
	<transition name="fade" v-on:after-leave="afterLeave">
		<div class="notification-box alert alert-success" role="alert" v-show="show">
			{{ message }}
		</div>
	</transition>
</template>

<script>
	/**
	 * This is a component that shows a box with a message when an action completes.
	 */			
	import { mapGetters, mapActions } from 'vuex'

	export default {
		data() {
			return {
				show: false
			}
		},
		methods: {
			...mapActions('notification', [
				'update',
			]),			

			/**
			 * Dispatch a request to the store to clear the notification message when the "after leave" transition finishes.
			 * @return {Promise}
			 */		
			afterLeave() {
				return this.update('');
				
			},
		},
		computed: {
			...mapGetters('notification', [
				'message'
			])
		},
		watch: {
			/**
			 * Hide the current notification message after a specific period
			 * @return void
			 */				
			message() {
				if(this.message) {
					this.show = true;
				}

				setTimeout(() => {
					this.show = false;
				}, 1500);
			}
		}
	}	

</script>
