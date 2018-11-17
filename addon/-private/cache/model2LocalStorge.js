/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default EmberObject.extend({
	store: service(),
	model2LocalStorge(model) {
		return this.get('store').__model2LocalStorge(model);
	}
});
