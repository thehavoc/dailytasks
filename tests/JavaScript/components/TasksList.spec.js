import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import TasksList from '../../../resources/assets/js/components/TasksList.vue';
import errors from '../../../resources/assets/js/store/modules/errors.js';
import tasks from '../../../resources/assets/js/store/modules/tasks.js';
import notification from '../../../resources/assets/js/store/modules/notification.js';
import moment from 'moment';
import expect from 'expect';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('TasksList', () => {
	let wrapper;
	let store;
	let date;
	let title;

	beforeEach (() => {
		date = moment().format('YYYY-MM-DD');

		title = 'Example title';

		store = new Vuex.Store({
			state: {},
			modules: {
				errors,
				tasks,
				notification
			}
		});		

		wrapper = shallow(TasksList, { 
			store, 
			localVue,
			propsData: {
				'title': title,
				'tasks': getTasks()
			}
		});
	});

	it ('shows the title', () => {
		expect(wrapper.html()).toContain(title);
	});

	it ('does not show the title', () => {
		expect(wrapper.html()).toContain(title);

		wrapper.setProps({
			title: ''
		});

		expect(wrapper.html()).not.toContain(title);
	});	

	it ('shows the number of tasks', () => {
		expect(wrapper.html()).toContain(getTasks().length);
	});

	it ('shows the tasks', () => {
		expect(wrapper.html()).toContain('list-group-item');
	});

	it ('does not show the tasks', () => {
		wrapper.setProps({
			tasks: []
		});		

		expect(wrapper.html()).not.toContain('list-group-item');
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
				completed: 0,
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