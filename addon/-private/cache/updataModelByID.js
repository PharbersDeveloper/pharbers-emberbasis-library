/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default EmberObject.extend({
	store: service(),
	updataModelByID(modelName, id, inputProperties) {
		return this.get('store').__updataModelByID(modelName, id, inputProperties);
	}
});
