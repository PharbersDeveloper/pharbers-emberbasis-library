/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	queryMultipleObject(url, modelName, condition) {
		return this.get('store').__queryMultipleObject(url, modelName, condition);
	}
});
