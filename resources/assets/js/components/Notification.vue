<template>
	<div class="notification-box alert alert-success" role="alert" v-show="message">
		{{ message }}
	</div>
</template>

<script>

	export default {

		data() {
			return {
			}
		},

		mounted() {
		},
		methods: {
		},
		computed: {
			message: function () {
				return this.$store.state.notification.message;

			},
		}  		
	}	

</script>
