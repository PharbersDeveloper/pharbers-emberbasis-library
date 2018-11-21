/* eslint-disable no-underscore-dangle */
import Service, { inject } from '@ember/service';
import queryObjectEmberObject from 'pharbers-emberbasis-library/-private/server/queryObject';
import queryMultipleObjectEmberObject from 'pharbers-emberbasis-library/-private/server/queryMultipleObject';
import transactionEmberObject from 'pharbers-emberbasis-library/-private/server/transaction';
import object2JsonApiEmberObject from 'pharbers-emberbasis-library/-private/model/object2JsonApi';

import {serverModelSerialize} from './util/serverPayload';

export default Service.extend({
	store: inject(),
	queryObject(url, modelName, condition) {
		let o = queryObjectEmberObject.create({ 'store': this.get('store') });

		return o.queryObject(url, modelName, condition).then(data => {
			let newData = {
				data: {},
				included: []
			};

			serverModelSerialize(data, newData);


			this.get('store').__cleanModel(this.get('store'), data.serialize({ includeId: true }));
			this.get('store').pushPayload(modelName, newData);

			return this.get('store').peekRecord(modelName, newData.data.id);
		});
	},
	queryMultipleObject(url, modelName, condition) {
		let o = queryMultipleObjectEmberObject.create({ 'store': this.get('store') });

		return o.queryMultipleObject(url, modelName, condition).then(data => {
			let newData = {
				data: [],
				included: []
			};

			serverModelSerialize(data, newData);

			data.forEach(model => {
				this.get('store').__cleanModel(this.get('store'), model.serialize({ includeId: true }));
			});

			this.get('store').pushPayload(modelName, newData);
			return this.get('store').peekAll(modelName);
		});
	},
	transaction(url, modelName, condition) {
		let o = transactionEmberObject.create({ 'store': this.get('store') });

		return o.transaction(url, modelName, condition);
	},
	object2JsonApi(model, isClean = true) {
		let o = object2JsonApiEmberObject.create({ 'store': this.get('store') });

		return o.object2JsonApi(model, isClean);
	}
});
