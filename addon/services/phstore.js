/* eslint-disable no-underscore-dangle */
import Service, { inject } from '@ember/service';
import queryObjectEmberObject from 'pharbers-emberbasis-library/-private/server/queryObject';
import queryMultipleObjectEmberObject from 'pharbers-emberbasis-library/-private/server/queryMultipleObject';
import transactionEmberObject from 'pharbers-emberbasis-library/-private/server/transaction';
import createModelEmberObject from 'pharbers-emberbasis-library/-private/cache/createModel';


export default Service.extend({
	store: inject(),
	queryObject(url, modelName, condition) {
		let o = queryObjectEmberObject.create({ 'store': this.get('store') });

		return o.queryObject(url, modelName, condition).then(data => {
			// this.get('store').__removeModelByID(modelName, data.get('id'));
			// this.get('store').__removeModelByAll(modelName);
			// this.get('store').__cleanModel(this.get('store'), data.serialize({ includeId: true }));

			return data;
		});
	},
	queryMultipleObject(url, modelName, condition) {
		this.get('store').peekAll(modelName).forEach(model => {
			this.get('store').__cleanModel(this.get('store'), model.serialize({ includeId: true }));
		});

		let o = queryMultipleObjectEmberObject.create({ 'store': this.get('store') });

		return o.queryMultipleObject(url, modelName, condition);
	},
	transaction(url, modelName, condition) {
		let o = transactionEmberObject.create({ 'store': this.get('store') });

		return o.transaction(url, modelName, condition);
	},
	createModel(modelName, inputProperties) {
		let o = createModelEmberObject.create({ 'store': this.get('store') });

		return o.createModel(modelName, inputProperties);
	},
	object2JsonApi(model, isClean = true) {
		return this.get('store').__object2JsonApi(model, isClean);
	}
});
