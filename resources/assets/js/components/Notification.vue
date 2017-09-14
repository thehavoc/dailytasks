<template>
	<transition name="fade">
		<div class="notification-box alert alert-success" role="alert" v-show="show" v-on:after-leave="afterLeave">
			{{ message }}
		</div>
	</transition>
</template>

<script>

	export default {
		data() {
			return {
				show: false
			}
		},
		methods: {
			afterLeave: function (el) {
				this.$store.commit('notification/changeMessage', '');
			},
		},
		computed: {
			message: function () {
				return this.$store.state.notification.message;
			}
		},
		watch: {
			message: function() {
				var vm = this;
				vm.show = true;

				setTimeout(function() {
					vm.show = false;
				}, 1500);
			}
		}
	}	

</script>
