import { shallow } from 'vue-test-utils';
import CollapseButton from '../../../resources/assets/js/components/CollapseButton.vue';
import sinon from 'sinon';
import expect from 'expect';

describe('CollapseButton', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(CollapseButton, {
			propsData: {
				'id': '#example-section'
			}			
		});
	});

	it('executes an event', () => {
		let spy = sinon.spy(wrapper.vm, 'toggle');		
		
		wrapper.update();

		wrapper.find('button').trigger('click');

		expect(spy.called).toBe(true);
	});
});