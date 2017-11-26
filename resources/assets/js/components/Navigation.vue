<template>
	<ul class="nav navbar-nav" :class="classes">
		<li v-for="item in menuItems">
			<a :href="item.url">{{ item.label }}</a>
		</li>
	</ul>
</template>

<script>
	/**
	 * Show a menu.
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
		}
	}
</script>
