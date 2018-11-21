import Service, { inject } from '@ember/service';

export default Service.extend({
	phinject: inject(),
	phserver: inject(),

	queryObject(url, modelName, condition) {
		return this.get('phserver').queryObject(url, modelName, condition);
	},
	queryMultipleObject(url, modelName, condition) {
		return this.get('phserver').queryMultipleObject(url, modelName, condition);
	},
	transaction(url, modelName, condition) {
		return this.get('phserver').transaction(url, modelName, condition);
	},
	object2JsonApi(model, isClean = true) {
		return this.get('phserver').object2JsonApi(model, isClean);
	},
	injectFunc(funcReference) {
		return this.get('phinject').injectFunc(funcReference);
	},
	getInjectFuncInstance(funcName, ...arg) {
		return this.get('phinject').getInjectFuncInstance(funcName, ...arg);
	}
});
