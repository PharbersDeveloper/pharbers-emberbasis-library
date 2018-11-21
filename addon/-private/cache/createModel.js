/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	createModel(modelName, inputProperties) {
		return this.get('store').__createModel(modelName, inputProperties);
	}
});
