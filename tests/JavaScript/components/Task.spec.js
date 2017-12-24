import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import Task from '../../../resources/assets/js/components/Task.vue';
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

describe ('Task', () => {
	let wrapper;
	let store;
	let route;

	beforeEach (() => {
		moxios.install();

		route = new Route();

		store = new Vuex.Store({
			state: {},
			modules: {
				errors,
				tasks,
				notification
			}
		});

		wrapper = shallow(Task, { 
			attachToDocument: true,
			store, 
			localVue,
			propsData: {
				'task': getTask()
			},
		});
	});

	afterEach(() => {
		moxios.uninstall()
	});

	it ('shows the task', () => {
		expect(wrapper.html()).toContain(getTask().title);

		expect(wrapper.html()).toContain(getTask().description);
	});

	it ('shows the time slot', () => {
		expect(wrapper.html()).toContain(getTask().time_slot);
	});

	it ('completes the task', (done) => {		
		let completedSelector = '.completed-task-text';		

		expect(wrapper.find(completedSelector).exists()).toBe(false);

		moxios.stubRequest(route.getUrl('updateTask', 'api') + wrapper.vm.task.id, {
			status: 200,
			response: wrapper.vm.task
		});

		click('input[type="checkbox"]');
		
		moxios.wait(() => {
			expect(wrapper.find(completedSelector).exists()).toBe(true);
			expect(notification.state.message).toBe('The task has been updated.');
			done();
		});       
	});

	let getTask = () => {
		return {
			id: 11,
			title: 'An example task',
			added_to: moment().format('YYYY-MM-DD'),
			completed: 0,
			time_slot: '11:00',
			description: 'The description of the task'					
		}		
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