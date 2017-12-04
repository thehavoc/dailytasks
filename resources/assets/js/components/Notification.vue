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
	export default {
		data() {
			return {
				show: false
			}
		},
		methods: {
			/**
			 * Dispatch a request to the store to clear the notification message when the "after leave" transition finishes.
			 * @return {Promise}
			 */		
			afterLeave() {
				return this.$store.commit('notification/CHANGE', '');
				
			},
		},
		computed: {
			/**
			 * Get the current notification message from the store.
			 * @return {Promise}
			 */			
			message() {
				return this.$store.getters['notification/get'];
			}
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

				var vm = this;
				
				setTimeout(function() {
					vm.show = false;

				}, 1500);
			}
		}
	}	

</script>
