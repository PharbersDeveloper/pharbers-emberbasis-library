/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default EmberObject.extend({
	store: service(),
	transaction(url, modelName, condition) {
		return this.get('store').__transaction(url, modelName, condition);
	}
});
