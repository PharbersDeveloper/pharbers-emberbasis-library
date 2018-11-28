/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';

export default EmberObject.extend({
	cleanModelInclusionRelation(model) {
		return this.get('store').__cleanModel(this.get('store'), model);
	}
});
