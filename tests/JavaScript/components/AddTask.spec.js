import { mount, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import AddTask from '../../../resources/assets/js/components/AddTask.vue';
import errors from '../../../resources/assets/js/store/modules/errors.js';
import tasks from '../../../resources/assets/js/store/modules/tasks.js';
import notification from '../../../resources/assets/js/store/modules/notification.js';
import expect from 'expect';
import moxios from 'moxios';
import Route from '../../../resources/assets/js/route/index.js';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('AddTask', () => {
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

		wrapper = mount(AddTask, { 
			store, 
			localVue,
		});
	});

	afterEach (() => {
		moxios.uninstall()
	});

	it ('creates a task', (done) => {
		typeForm();

		moxios.stubRequest(route.getUrl('addTask', 'api'), {
			status: 200,
			response: wrapper.vm.task
		});

		click('button');
		
		moxios.wait(() => {
			expect(notification.state.message).toBe('A new task has been added.');
			done();
		});  
	});

	it ('shows errors ', (done) => {
		let error = 'The title field is required.';

		typeForm();

		moxios.stubRequest(route.getUrl('addTask', 'api'), {
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

	let typeForm = () => {
		let fields = [
			{
				selector: 'input[name="title"]',
				value: 'Test title'
			},
			{
				selector: 'textarea[name="description"]',
				value: 'Test description'
			}							
		];

		fields.map((field) => {
			type(field.selector, field.value);
		});
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