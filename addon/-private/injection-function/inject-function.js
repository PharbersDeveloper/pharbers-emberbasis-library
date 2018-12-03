import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { assert } from '@ember/debug';

export default EmberObject.create({
	listFunc: new A(),

	funcInjection(func) {
		let name = func.name;

		assert(`List of the same key, KeyName => '${name}'`, !this.get('listFunc').any(obj => obj.name === name));
		this.get('listFunc').pushObject({ name, reference: func });
	},

	getFuncInstance(_this, funcName, ...arg) {
		let reVal = this.get('listFunc').find(obj => obj.name === funcName);

		assert(`Function is not find，Please review => ${funcName}`, reVal);
		if (reVal) {
			reVal.reference.call(_this, ...arg);
		}
		return null;
	}
});
