/**
 * The main app that loads all JavaScript dependencies that include Vue and other libraries.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Create our Vue application.
 * Load the store (Vuex).
 * Initialize the main app components.
 */

Vue.component('usertasks', require('./components/UserTasks.vue'));
Vue.component('addtask', require('./components/AddTask.vue'));
Vue.component('notification', require('./components/Notification.vue'));
Vue.component('edittask', require('./components/editTask.vue'));
Vue.component('navigation', require('./components/Navigation.vue'));
Vue.component('collapsebutton', require('./components/CollapseButton.vue'));

import store from './store'

const app = new Vue({
    el: '#app',
    store
});