/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	queryModelByID(modelName, id) {
		return this.get('store').__queryModelByID(modelName, id);
	}
});
