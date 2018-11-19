/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	object2JsonApi(model, isClean = true) {
		return this.get('store').__object2JsonApi(model, isClean);
	}
});
