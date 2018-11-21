import Component from '@ember/component';
import layout from '../templates/components/show-c';

export default Component.extend({
	layout,
	actions: {
		Child2() {
			this.get('logger').log(this.get('controller'));
			// this.get('eventHandle').upAction(this, 'next2', 'Fuck 666')
		}
	}
});
