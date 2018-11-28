import Service, { inject } from '@ember/service';

export default Service.extend({
	phinject: inject(),
	phcache: inject(),

	createModel(modelName, inputProperties) {
		return this.get('phcache').createModel(modelName, inputProperties);
	},
	queryModelByID(modelName, id) {
		return this.get('phcache').queryModelByID(modelName, id);
	},
	queryModelByAll(modelName) {
		return this.get('phcache').queryModelByAll(modelName);
	},
	removeModelByID(modelName, id) {
		return this.get('phcache').removeModelByID(modelName, id);
	},
	removeModelByAll(modelName) {
		return this.get('phcache').removeModelByAll(modelName);
	},
	updataModelByID(modelName, id, inputProperties) {
		return this.get('phcache').updataModelByID(modelName, id, inputProperties);
	},
	model2LocalStorge(model) {
		return this.get('phcache').model2LocalStorge(model);
	},
	resetChangedModelAttr(model) {
		return this.get('phcache').resetChangedModelAttr(model);
	},
	cleanModelInclusionRelation(model) {
		return this.get('phcache').cleanModelInclusionRelation(model);
	},
	injectFunc(funcReference) {
		return this.get('phinject').injectFunc(funcReference);
	},
	getInjectFuncInstance(funcName, ...arg) {
		return this.get('phinject').getInjectFuncInstance(funcName, ...arg);
	}
});
