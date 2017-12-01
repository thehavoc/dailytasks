<template>
	<ul class="nav navbar-nav" :class="classes">
		<li v-for="item in menuItems">
			<a v-on:click="itemEvent(item.event)" :href="item.url">{{ item.label }}</a>
		</li>
	</ul>
</template>

<script>
	/**
	 * This is a component that shows a menu. The `items` prop must be used.
	 */
	import Route from '../route/index.js';

	export default {
		props: ['items', 'classes'],

		data() {
			return {
			}
		},

		created() {
			this.route = new Route();
		},

		computed: {
			/**
			 * Add the absolute URLs of the menu items.
			 * @return {Object}
			 */	
			menuItems: function() {
				let route = this.route;
				let items = this.items;

				items.map(function(item) {

					item.url = '';

					if(item.route) {
						item.url = route.getUrl(item.route);
					}

					return item;
				});

				return items;
			},
		},

		methods: {
			/**
			 * Execute a method.
			 * @param {String} method
			 * @return void
			 */
			itemEvent: function(method) {
				if(method && this[method].length) {
					this[method]();
				}
			},

			/**
			 * Submit the logout form
			 * @return void
			 */
			logout: function() {
				event.preventDefault();
				document.getElementById('logout-form').submit();
			}
		}
	}
</script>
