/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	queryModelByAll(modelName) {
		return this.get('store').__queryModelByAll(modelName);
	}
});
