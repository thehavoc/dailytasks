<template>
	<div>
		<ul v-if="menuItems.length > 0" class="nav navbar-nav" :class="classes">
			<li v-for="item in menuItems" :key="item.route">
				<a v-on:click="itemEvent(item.event)" :href="item.url">{{ item.label }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	/**
	 * This is a component that shows a menu. The `items` prop must be used.
	 */
	import Route from '../route/index.js';

	export default {
		props: {
			items: Array,
			classes: String
		},

		/**
		 * Initialize the route class.
		 */
		created() {
			this.route = new Route();
		},

		computed: {
			/**
			 * Add the absolute URLs of the menu items.
			 * @return {Object}
			 */	
			menuItems() {

				if(!this.items) {
					return [];
				}

				let route = this.route;
				let items = this.items;

				items.map((item) => {

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
			itemEvent(method) {
				if(method && this[method].length) {
					this[method]();
					return true;
				}

				return false;
			},

			/**
			 * Submit the logout form
			 * @return void
			 */
			logout() {
				document.getElementById('logout-form').submit();
			}
		}
	}
</script>
