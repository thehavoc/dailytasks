import { shallow, createLocalVue } from 'vue-test-utils';
import Navigation from '../../../resources/assets/js/components/Navigation.vue';
import sinon from 'sinon';
import expect from 'expect';

describe ('Navigation', () => {
	var wrapper;

	beforeEach (() => {
		wrapper = shallow(Navigation, {
			propsData: {
				'items': getItems()
			}			
		});
	});

	it ('presents the menu list', () => {
		expect(wrapper.html()).toContain('nav');
	});

	it ('does not present the menu list', () => {
		wrapper.setProps({
			'items': []
		});

		expect(wrapper.html()).not.toContain('nav');
	});

	it ('executes a custom method', () => {
		var spy = sinon.spy(wrapper.vm, 'itemEvent');

		wrapper.find('a').trigger('click');

		expect(spy.called).toBe(true);
	});

	function getItems() {
		var items = [
			{
				'route': 'login',
				'label': 'Login'
			},
			{
				'route': 'register',
				'label': 'Register'
			},
			{
				'route': 'Logout',
				'label': 'Logout',
				'method': 'logout'
			},			
		];	
		
		return items;	
	}

});