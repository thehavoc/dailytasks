import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import UserTasks from '../../../resources/assets/js/components/NewQuickTask.vue';
import errors from '../../../resources/assets/js/store/modules/errors.js';
import sinon from 'sinon';
import expect from 'expect';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('NewQuickTask', () => {
	let wrapper;
	let actions;
	let store;

	beforeEach (() => {

		store = new Vuex.Store({
			state: {},
			getters: errors.getters
		});

		wrapper = shallow(UserTasks, { 
			store, 
			localVue,
			propsData: {
				'date': '2017-12-06'
			}	
		});
	});

	it ('adds a quick task', () => {
		// wrapper.find('button').trigger('click');
	});

});