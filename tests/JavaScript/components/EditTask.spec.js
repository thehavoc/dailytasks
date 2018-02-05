import { mount, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import EditTask from '../../../resources/assets/js/components/EditTask.vue';
import errors from '../../../resources/assets/js/store/modules/errors.js';
import tasks from '../../../resources/assets/js/store/modules/tasks.js';
import notification from '../../../resources/assets/js/store/modules/notification.js';
import expect from 'expect';
import moment from 'moment';
import moxios from 'moxios';
import Route from '../../../resources/assets/js/route/index.js';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('EditTask', () => {
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

		wrapper = mount(EditTask, { 
			store, 
			localVue,
		});

		wrapper.setData({ 
			task: getTask() 
		});
	});

	afterEach (() => {
		moxios.uninstall()
	});

	it ('updates a task', (done) => {
		moxios.stubRequest(route.getUrl('updateTask', 'api') + getTask().id, {
			status: 200,
			response: wrapper.vm.task
		});

		click('button');
		
		moxios.wait(() => {
			expect(notification.state.message).toBe('The task has been updated.');
			done();
		});  
	});

	it ('shows errors ', (done) => {
		let error = 'The title field is required.';

		moxios.stubRequest(route.getUrl('updateTask', 'api') + getTask().id, {
			status: 422,
			response: {
				title: [error]
			}
		});

		click('button');
		
		moxios.wait(() => {
			expect(wrapper.html()).toContain(error);
			done();
		}); 
	});

	let getTask = () => {
		return {
			id: 1,
			title: 'Title',
			description: 'Description',
			added_to: moment().format('YYYY-MM-DD')
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