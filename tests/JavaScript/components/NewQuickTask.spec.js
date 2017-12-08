import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import NewQuickTask from '../../../resources/assets/js/components/NewQuickTask.vue';
import errors from '../../../resources/assets/js/store/modules/errors.js';
import tasks from '../../../resources/assets/js/store/modules/tasks.js';
import notification from '../../../resources/assets/js/store/modules/notification.js';
import sinon from 'sinon';
import moxios from 'moxios'
import expect from 'expect';
import Route from '../../../resources/assets/js/route/index.js';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('NewQuickTask', () => {
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

		wrapper = shallow(NewQuickTask, { 
			store, 
			localVue,
			propsData: {
				'date': '2017-12-06'
			}	
		});
	});

	afterEach(() => {
		moxios.uninstall()
	})

	it ('adds a quick task', (done) => {
		let title = 'Example task title';

		type('input.text-field', title);

		expect(wrapper.vm.task.title).toBe(title);

		moxios.stubRequest(route.getUrl('addQuickTask', 'api'), {
			status: 200,
			response: {
				title: title
			}
		});

		click('button');
		
		moxios.wait(() => {
			expect(notification.state.message).toBe('A new task has been added.');
			expect(wrapper.vm.task.title).not.toBe(title);
			done();
		});        
	});		

	it ('does not add a quick task', (done) => {
		let title = 'Example task title';
		let error = 'The title field is required.';

		type('input.text-field', title);

		expect(wrapper.vm.task.title).toBe(title);

		moxios.stubRequest(route.getUrl('addQuickTask', 'api'), {
			status: 400,
			response: {
				'title': [
					error
				]
			}
		});

		click('button');
		
		moxios.wait(() => {
			expect(wrapper.html()).toContain(error);
			done();
		});        
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