import { shallow } from 'vue-test-utils';
import Navigation from '../../../resources/assets/js/components/Navigation.vue';
import sinon from 'sinon';
import expect from 'expect';

describe ('Navigation', () => {
	let wrapper;

	beforeEach (() => {
		wrapper = shallow(Navigation, {
			propsData: {
				'items': getItems()
			}			
		});
	});

	it ('executes a custom method', () => {
		let spy = sinon.spy(wrapper.vm, 'itemEvent');

		wrapper.find('a').trigger('click');

		expect(spy.called).toBe(true);
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

	let getItems = () => {
		let items = [
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