/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	model2LocalStorge(model) {
		return this.get('store').__model2LocalStorge(model);
	}
});
