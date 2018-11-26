/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	updataModelByID(modelName, id, inputProperties) {
		return this.get('store').__updataModelByID(modelName, id, inputProperties);
	}
});
