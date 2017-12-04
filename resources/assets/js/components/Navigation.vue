<template>
	<div>
		<ul v-if="menuItems.length > 0" class="nav navbar-nav" :class="classes">
			<li v-for="item in menuItems">
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
		props: ['items', 'classes'],

		data() {
			return {
			}
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

				var route = this.route;
				var items = this.items;
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
