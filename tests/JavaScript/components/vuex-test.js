import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import UserTasks from '../../../resources/assets/js/components/UserTasks.vue';
import TasksModule from '../../../resources/assets/js/store/modules/tasks.js';
import expect from 'expect';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('UserTasks', () => {
	let wrapper;
	let actions;
	let store;
	let getters;

	beforeEach (() => {
		store = new Vuex.Store({
			state: {},
		});	
	});

	it ('first test', () => {
		wrapper = shallow(UserTasks, { store, localVue });
	});

});