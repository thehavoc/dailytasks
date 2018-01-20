import { shallow, createLocalVue, TransitionStub } from 'vue-test-utils';
import Vuex from 'vuex';
import NotificationComponent from '../../../resources/assets/js/components/Notification.vue';
import notification from '../../../resources/assets/js/store/modules/notification.js';
import sinon from 'sinon';
import expect from 'expect';

const localVue = createLocalVue();

localVue.use(Vuex);

describe ('Notification', () => {
	let wrapper;
	let store;
	let route;

	beforeEach (() => {
		store = new Vuex.Store({
			state: {},
			modules: {
				notification
			}
		});		

		wrapper = shallow(NotificationComponent, { 
			store, 
			localVue,
			stubs: {
				transition: TransitionStub,			
			}
		});
	});

	it ('does not show the notification', () => {
		wrapper.vm.update('');

		wrapper.update();

		expect(wrapper.find('.notification-box').exists()).toBe(false);
	});

	it ('shows the notification', () => {
		let message = 'An example message 2';

		wrapper.vm.update(message);

		wrapper.update();

		expect(wrapper.html()).toContain(message);
	});		
});