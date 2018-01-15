import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import UserTasks from '../../../resources/assets/js/components/UserTasks.vue';
import errors from '../../../resources/assets/js/store/modules/errors.js';
import tasks from '../../../resources/assets/js/store/modules/tasks.js';
import notification from '../../../resources/assets/js/store/modules/notification.js';
import sinon from 'sinon';
import moxios from 'moxios';
import moment from 'moment';
import expect from 'expect';
import Route from '../../../resources/assets/js/route/index.js';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('UserTasks', () => {
	let wrapper;
	let store;
	let route;
	let date;
	let apiURL;

	beforeEach (() => {
		moxios.install();

		date = moment().format('YYYY-MM-DD');

		route = new Route();

		apiURL = route.getUrl('tasks', 'api') + date;

		store = new Vuex.Store({
			state: {},
			modules: {
				errors,
				tasks,
				notification
			}
		});		

		wrapper = shallow(UserTasks, { 
			store, 
			localVue,
			propsData: {
				'date': date
			}
		});
	});

	afterEach(() => {
		moxios.uninstall()
	});

	it ('does not show tasks', (done) => {
		moxios.stubRequest(apiURL, {
			status: 200,
			response: []
		});

		moxios.wait(() => {
			expect(wrapper.html()).toContain('There are no available tasks for this day');
			done();
		});
	});

	it ('contains completed tasks', (done) => {
		moxios.stubRequest(apiURL, {
			status: 200,
			response: getTasks()
		});

		moxios.wait(() => {
			expect(wrapper.vm.completed).not.toBeNull();
			done();
		});
	});

	it ('contains todo tasks', (done) => {
		moxios.stubRequest(apiURL, {
			status: 200,
			response: getTasks()
		});

		moxios.wait(() => {
			expect(wrapper.vm.todo).not.toBeNull();
			done();
		});
	});

	let getTasks = () => {
		return [
			{
				id: 11,
				title: 'An example task',
				added_to: date,
				completed: 0,
				time_slot: '11:00',
				description: 'The description of the task'					
			},
			{
				id: 12,
				title: 'An example task 2',
				added_to: date,
				completed: 1,
				time_slot: '13:00',
				description: 'The description of the task'					
			}			
		];
	}

	let type = (selector, text) => {
		let input = wrapper.find(selector);

		input.element.value = text;
		input.trigger('input');
	}

	let click = (selector) => {
		wrapper.find(selector).trigger('click');
	}
});