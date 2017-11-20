<template>
	<transition name="fade" v-on:after-leave="afterLeave">
		<div class="notification-box alert alert-success" role="alert" v-show="show">
			{{ message }}
		</div>
	</transition>
</template>

<script>
	/**
	 * Show a box with a message when an action completes.
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
			afterLeave: function () {
				return this.$store.commit('notification/CHANGE', '');
				
			},
		},
		computed: {
			/**
			 * Get the current notification message from the store.
			 * @return {Promise}
			 */			
			message: function () {
				return this.$store.getters['notification/get'];
			}
		},
		watch: {
			/**
			 * Hide the current notificaiton message after a specific period
			 * @return void
			 */				
			message: function() {
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
