<template>
	<transition name="fade" v-on:after-leave="afterLeave">
		<div class="notification-box alert alert-success" role="alert" v-show="show">
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
				this.$store.commit('notification/CHANGE', '');
				
			},
		},
		computed: {
			message: function () {
				return this.$store.getters['notification/get'];
			}
		},
		watch: {
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
