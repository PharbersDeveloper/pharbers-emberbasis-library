/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	queryObject(url, modelName, condition) {
		return this.get('store').__queryObject(url, modelName, condition);
	}
});
