import Service, { inject } from '@ember/service';

export default Service.extend({
	phstore: inject(),

	publicKey: 'aaaa',
	queryObject(url, modelName, condition) {
		return this.get('phstore').queryObject(url, modelName, condition);
	},
	queryMultipleObject(url, modelName, condition) {
		return this.get('phstore').queryMultipleObject(url, modelName, condition);
	},
	transaction(url, modelName, condition) {
		return this.get('phstore').transaction(url, modelName, condition);
	},
	createModel(modelName, inputProperties) {
		return this.get('phstore').createModel(modelName, inputProperties);
	},
	queryModelByID(modelName, id) {
		return this.get('phstore').queryModelByID(modelName, id);
	},
	queryModelByAll(modelName) {
		return this.get('phstore').queryModelByAll(modelName);
	},
	removeModelByID(modelName, id) {
		return this.get('phstore').removeModelByID(modelName, id);
	},
	removeModelByAll(modelName) {
		return this.get('phstore').removeModelByAll(modelName);
	},
	updataModelByID(modelName, id, inputProperties) {
		return this.get('phstore').updataModelByID(modelName, id, inputProperties);
	},
	object2JsonApi(model, isClean = true) {
		return this.get('phstore').object2JsonApi(model, isClean);
	},
	injectFunc(funcReference) {
		return this.get('phstore').injectFunc(funcReference);
	},
	getInjectFuncInstance(funcName, ...arg) {
		return this.get('phstore').getInjectFuncInstance(funcName, ...arg);
	}
});
