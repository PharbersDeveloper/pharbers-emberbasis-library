/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default EmberObject.extend({
	store: service(),
	queryModelByAll(modelName) {
		return this.get('store').__queryModelByAll(modelName);
	}
});
