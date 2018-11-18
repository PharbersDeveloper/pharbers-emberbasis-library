/* eslint-disable no-underscore-dangle */
import Service, { inject } from '@ember/service';
import { isArray } from '@ember/array';
import queryObjectEmberObject from 'pharbers-emberbasis-library/-private/server/queryObject';
import queryMultipleObjectEmberObject from 'pharbers-emberbasis-library/-private/server/queryMultipleObject';
import transactionEmberObject from 'pharbers-emberbasis-library/-private/server/transaction';
import createModelEmberObject from 'pharbers-emberbasis-library/-private/cache/createModel';

export function setDataRelationships(model, json) {
	model.eachRelationship((key, descriptor) => {
		let relationships = json['relationships'] = {}, relationshipKey = relationships[key] = {};

		if (descriptor.kind === 'hasMany') {
			let data = relationshipKey['data'] = [];

			model.get(key).toArray().forEach(result => {
				data.push({
					id: result.get('id'),
					type: descriptor.type
				});
			});
		} else {
			relationshipKey['data'] = {
				id: model.get('id'),
				type: descriptor.type
			};
		}
	});
}

export function serverIncludedSerialize(model, json) {
	model.eachRelationship((key, descriptor) => {
		if (descriptor.kind === 'hasMany') {
			model.get(key).toArray().forEach(result => {
				let m = {};

				m['id'] = result.get('id');
				m['type'] = result.serialize({ includeId: true }).type;
				result.eachAttribute(name => {
					let attributes = m['attributes'] = {};

					attributes[name] = result.data[name];
				});
				json.push(m);
				setDataRelationships(result, m);
				serverIncludedSerialize(result, json);
			});
		} else {
			let m = {};

			m['id'] = model.get(key).get('id');
			m['type'] = model.get(key).serialize({ includeId: true }).type;
			model.get(key).eachAttribute(name => {
				let attributes = m['attributes'] = {};

				attributes[name] = model.get(key).data[name];
			});
			json.push(m);
			setDataRelationships(model.get(key), m);
			serverIncludedSerialize(model.get(key), json);
		}
	});
}

export function serverDataSerialize(model, json) {
	if (isArray(model)) {
		model.forEach(single => {
			let m = {};

			m['id'] = single.get('id');
			m['type'] = single.serialize({ includeId: true }).type;
			single.eachAttribute(name => {
				let attributes = m['attributes'] = {};

				attributes[name] = single.data[name];
			});
			json.data.push(m);
			setDataRelationships(single, m);
			serverIncludedSerialize(single, json.included);
		});
	} else {
		let m = {};

		m['id'] = model.get('id');
		m['type'] = model.serialize({ includeId: true }).type;
		model.eachAttribute(name => {
			let attributes = m['attributes'] = {};

			attributes[name] = model.data[name];
		});
		json.data = m;
		setDataRelationships(model, m);
		serverIncludedSerialize(model, json.included);
	}
}

export function serverModelSerialize(model, json) {
	serverDataSerialize(model, json);
}

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
	createModel(modelName, inputProperties) {
		let o = createModelEmberObject.create({ 'store': this.get('store') });

		return o.createModel(modelName, inputProperties);
	},
	object2JsonApi(model, isClean = true) {
		return this.get('store').__object2JsonApi(model, isClean);
	}
});
