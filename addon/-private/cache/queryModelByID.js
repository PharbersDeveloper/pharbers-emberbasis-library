/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default EmberObject.extend({
	store: service(),
	queryModelByID(modelName, id) {
		return this.get('store').__queryModelByID(modelName, id);
	}
});
