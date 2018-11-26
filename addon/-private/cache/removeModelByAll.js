/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	removeModelByAll(modelName) {
		return this.get('store').__removeModelByAll(modelName);
	}
});
