/**
 * Load all JavaScript dependencies which includes Vue and other libraries.
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

import store from './store'

const app = new Vue({
    el: '#app',
    store
});