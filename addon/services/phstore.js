/* eslint-disable no-underscore-dangle */
import Service, { inject } from '@ember/service';
import { isArray } from '@ember/array';
import queryObjectEmberObject from 'pharbers-emberbasis-library/-private/server/queryObject';
import queryMultipleObjectEmberObject from 'pharbers-emberbasis-library/-private/server/queryMultipleObject';
import transactionEmberObject from 'pharbers-emberbasis-library/-private/server/transaction';
import createModelEmberObject from 'pharbers-emberbasis-library/-private/cache/createModel';

import queryModelByIDEmberObject from 'pharbers-emberbasis-library/-private/cache/queryModelByID';
import queryModelByAllEmberObject from 'pharbers-emberbasis-library/-private/cache/queryModelByAll';
import removeModelByIDEmberObject from 'pharbers-emberbasis-library/-private/cache/removeModelByID';
import removeModelByAllEmberObject from 'pharbers-emberbasis-library/-private/cache/removeModelByAll';
import updataModelByIDEmberObject from 'pharbers-emberbasis-library/-private/cache/updataModelByID';

import object2JsonApiEmberObject from 'pharbers-emberbasis-library/-private/model/object2JsonApi';

import injectFunctionEmberObject from 'pharbers-emberbasis-library/-private/injection-function/inject-function';

export function setDataRelationships(model, json, existData) {
	model.eachRelationship((key, descriptor) => {
		let relationships = json['relationships'] = {}, relationshipKey = relationships[key] = {};

		if (descriptor.kind === 'hasMany') {
			let data = relationshipKey['data'] = [];

			model.get(key).toArray().forEach(result => {
				let payloadType = '', isExits = 0;

				payloadType = result.store.serializerFor(result._internalModel.modelName).payloadKeyFromModelName(result._internalModel.modelName);
				isExits = existData.filter(elem => elem.id === result.get('id') && elem.type === payloadType).length;

				if (isExits === 0) {
					data.push({
						id: result.get('id'),
						type: descriptor.type
					});
				} else {
					delete relationships[key];
				}
			});
		} else {
			let payloadType = '', isExits = 0;

			payloadType = model.store.serializerFor(model._internalModel.modelName).payloadKeyFromModelName(model._internalModel.modelName);
			isExits = existData.filter(elem => elem.id === model.get('id') && elem.type === payloadType).length;

			if (isExits === 0) {
				relationshipKey['data'] = {
					id: model.get('id'),
					type: descriptor.type
				};
			} else {
				delete relationships[key];
			}
		}
	});
}

export function serverIncludedSerialize(model, json, existData) {
	model.eachRelationship((key, descriptor) => {
		if (descriptor.kind === 'hasMany') {
			model.get(key).toArray().forEach(result => {
				let m = {}, isExits = 0;

				m['id'] = result.get('id');
				m['type'] = result.store.serializerFor(result._internalModel.modelName).payloadKeyFromModelName(result._internalModel.modelName);//result.serialize({ includeId: true }).type;

				isExits = existData.filter(elem => elem.id === m.id && elem.type === m.type).length;

				if (isExits === 0) {
					result.eachAttribute(name => {
						let attributes = m['attributes'] = {};

						attributes[name] = result.data[name];
					});

					json.push(m);

					existData.push({id: m.id, type: m.type});

					setDataRelationships(result, m, existData);
					serverIncludedSerialize(result, json, existData);
				}
			});
		} else {
			let m = {}, isExits = 0;

			m['id'] = model.get(key).get('id');
			m['type'] = model.get(key).store.serializerFor(model.get(key)._internalModel.modelName).payloadKeyFromModelName(model.get(key)._internalModel.modelName);//model.get(key).serialize({ includeId: true }).type;

			isExits = existData.filter(elem => elem.id === m.id && elem.type === m.type).length;

			if (isExits === 0) {
				model.get(key).eachAttribute(name => {
					let attributes = m['attributes'] = {};

					attributes[name] = model.get(key).data[name];
				});

				json.push(m);

				existData.push({id: m.id, type: m.type});

				setDataRelationships(model.get(key), m, existData);
				serverIncludedSerialize(model.get(key), json, existData);
			}
		}
	});
}

export function serverDataSerialize(model, json) {
	let existData = [];

	if (isArray(model)) {
		model.forEach(single => {
			let m = {};

			m['id'] = single.get('id');
			m['type'] = single.store.serializerFor(single._internalModel.modelName).payloadKeyFromModelName(single._internalModel.modelName);//single.serialize({ includeId: true }).type;

			single.eachAttribute(name => {
				let attributes = m['attributes'] = {};

				attributes[name] = single.data[name];
			});
			json.data.push(m);

			existData.push({id: m.id, type: m.type});

			setDataRelationships(single, m, existData);
			serverIncludedSerialize(single, json.included, existData);
		});
	} else {
		let m = {};

		m['id'] = model.get('id');
		m['type'] = model.store.serializerFor(model._internalModel.modelName).payloadKeyFromModelName(model._internalModel.modelName);//model.serialize({ includeId: true }).type;

		model.eachAttribute(name => {
			let attributes = m['attributes'] = {};

			attributes[name] = model.data[name];
		});

		json.data = m;

		existData.push({id: m.id, type: m.type});

		setDataRelationships(model, m, existData);
		serverIncludedSerialize(model, json.included, existData);
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
		let o = updataModelByIDEmberObject.create({ 'store': this.get('store') });

		return o.updataModelByID(modelName, id, inputProperties);
	},
	object2JsonApi(model, isClean = true) {
		let o = object2JsonApiEmberObject.create({ 'store': this.get('store') });

		return o.object2JsonApi(model, isClean);
	},
	injectFunc(funcReference) {
		injectFunctionEmberObject.funcInjection(funcReference);
	},
	getInjectFuncInstance(funcName, ...arg) {
		injectFunctionEmberObject.getFuncInstance(this, funcName, ...arg);
	}
});
