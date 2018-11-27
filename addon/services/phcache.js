/* eslint-disable no-underscore-dangle */
import Service, { inject } from '@ember/service';
import createModelEmberObject from 'pharbers-emberbasis-library/-private/cache/createModel';
import removeModelByIDEmberObject from 'pharbers-emberbasis-library/-private/cache/removeModelByID';
import removeModelByAllEmberObject from 'pharbers-emberbasis-library/-private/cache/removeModelByAll';
import updataModelByIDEmberObject from 'pharbers-emberbasis-library/-private/cache/updataModelByID';
import queryModelByIDEmberObject from 'pharbers-emberbasis-library/-private/cache/queryModelByID';
import queryModelByAllEmberObject from 'pharbers-emberbasis-library/-private/cache/queryModelByAll';
import model2LocalStorgeEmberObject from 'pharbers-emberbasis-library/-private/cache/model2LocalStorge';
import resetChangedModelAttrEmberObject from 'pharbers-emberbasis-library/-private/cache/resetChangedModelAttr';

import { resrtChangedModelAttr } from './util/cacheResetChangedModelAttr';

export default Service.extend({
	store: inject(),
	createModel(modelName, inputProperties) {
		let o = createModelEmberObject.create({ 'store': this.get('store') }), modelInstance = null;

		modelInstance = o.createModel(modelName, inputProperties);
		modelInstance.eachAttribute(key => {
			modelInstance._internalModel.__data[key] = modelInstance.get(key);
		});

		return modelInstance;
	},
	queryModelByID(modelName, id) {
		let o = queryModelByIDEmberObject.create({ 'store': this.get('store') });

		return o.queryModelByID(modelName, id);
	},
	queryModelByAll(modelName) {
		let o = queryModelByAllEmberObject.create({ 'store': this.get('store') });

		return o.queryModelByAll(modelName);
	},
	removeModelByID(modelName, id) {
		let o = removeModelByIDEmberObject.create({ 'store': this.get('store') });

		return o.removeModelByID(modelName, id);
	},
	removeModelByAll(modelName) {
		let o = removeModelByAllEmberObject.create({ 'store': this.get('store') });

		return o.removeModelByAll(modelName);
	},
	updataModelByID(modelName, id, inputProperties) {
		let o = updataModelByIDEmberObject.create({ 'store': this.get('store') }), modelInstance = null;

		modelInstance = o.updataModelByID(modelName, id, inputProperties);
		modelInstance.eachAttribute(key => {
			modelInstance._internalModel.__data[key] = modelInstance.get(key);
		});
		return modelInstance;
	},
	model2LocalStorge(model) {
		let o = model2LocalStorgeEmberObject.create({ 'store': this.get('store') });

		return o.model2LocalStorge(model);
	},
	resetChangedModelAttr(model) {
		let o = resetChangedModelAttrEmberObject.create({ 'store': this.get('store') });

		resrtChangedModelAttr(o, model);
		return model;
	}

});
