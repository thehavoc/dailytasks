import { mount, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import AddTask from '../../../resources/assets/js/components/AddTask.vue';
import errors from '../../../resources/assets/js/store/modules/errors.js';
import tasks from '../../../resources/assets/js/store/modules/tasks.js';
import notification from '../../../resources/assets/js/store/modules/notification.js';
import sinon from 'sinon';
import moment from 'moment';
import expect from 'expect';
import Route from '../../../resources/assets/js/route/index.js';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('AddTask', () => {
	let wrapper;
	let store;
	let route;

	beforeEach (() => {
		route = new Route();

		store = new Vuex.Store({
			state: {},
			modules: {
				errors,
				tasks,
				notification
			}
		});

		wrapper = mount(AddTask, { 
			store, 
			localVue,
		});
	});

	it ('test', () => {
		
		expect(true).toBe(true);
	});

	let type = (selector, text) => {
		let input = wrapper.find(selector);

		input.element.value = text;
		input.trigger('input');
	}

	let click = (selector) => {
		wrapper.find(selector).trigger('click');
	}	

});