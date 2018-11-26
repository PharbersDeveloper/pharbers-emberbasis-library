import EmberObject from '@ember/object';

export default EmberObject.extend({
	resetChangedModelAttr(model) {
		let changedModelFields = model.changedAttributes();

		Object.keys(changedModelFields).forEach(key => {
			model.set(key, changedModelFields[key][0]);
		});
	}
});
