/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	removeModelByID(modelName, id) {
		return this.get('store').__removeModelByID(modelName, id);
	}
});
