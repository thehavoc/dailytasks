import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import notification from './modules/notification'
import tasks from './modules/tasks'
import errors from './modules/errors'

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules: {
		notification,
		tasks,
		errors
	}
});