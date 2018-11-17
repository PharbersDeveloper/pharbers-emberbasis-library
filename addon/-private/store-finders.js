/* eslint-disable no-underscore-dangle */
import { _bind, _guard, _objectIsAlive } from './store-common';

import { normalizeResponseHelper } from './serializer-response';
import { serializerForAdapter } from './serializers';
import { isArray } from '@ember/array';


/**
 * 只做了2件事 监测绑定store与adapter转向代理方法的封装
 * 这是个封装的工具包
 */

/**
 * 单个查询
 * 连接后端
 * @param {String} url
 * @param {Ember Object/Adapter} adapter
 * @param {Ember Object/DS.Store} store
 * @param {String} modelName
 * @param {String} query
 * @returns {Promise}
 */
export function _queryObject(url, adapter, store, modelName, query) {
	let modelClass = null, promise = null, label = null, serializer = null, payload = null;

	modelClass = store.modelFor(modelName);
	promise = adapter.queryObject(url, store, modelClass, query);

	label = `DS: Handle Adapter#queryObject of ${modelName}`;

	promise = Promise.resolve(promise, label);
	promise = _guard(promise, _bind(_objectIsAlive, store));

	return promise.then((adapterPayload) => {

		serializer = serializerForAdapter(store, adapter, modelName);
		payload = normalizeResponseHelper(serializer, store, modelClass, adapterPayload, null, 'queryObject');

		return store._push(payload);
	}, null, `DS: Extract payload of queryObject ${modelName}`);
}

/**
 * 列表查询
 * 连接后端
 * @param {String} url
 * @param {Ember Object/Adapter} adapter
 * @param {Ember Object/DS.Store} store
 * @param {String} modelName
 * @param {String} query
 * @param {Array} recordArray
 * @returns {Promise}
 */
export function _queryMultipleObject(url, adapter, store, modelName, query, recordArray) {
	let modelClass = null,
		promise = null,
		label = '',
		serializer = null,
		payload = null,
		internalModels = null,
		recordArrays = null;

	modelClass = store.modelFor(modelName);

	if (adapter.queryMultipleObject.length > 4) {
		recordArrays = recordArray || store.recordArrayManager.createAdapterPopulatedRecordArray(modelName, query);
		promise = adapter.queryMultipleObject(url, store, modelClass, query, recordArrays);
	} else {
		promise = adapter.queryMultipleObject(url, store, modelClass, query);
	}

	label = `DS: Handle Adapter#queryMultipleObject of ${modelClass}`;

	promise = Promise.resolve(promise, label);
	promise = _guard(promise, _bind(_objectIsAlive, store));

	return promise.then(adapterPayload => {
		serializer = serializerForAdapter(store, adapter, modelName);
		payload = normalizeResponseHelper(serializer, store, modelClass, adapterPayload, null, 'queryMultipleObject');

		internalModels = store._push(payload);

		if (recordArray) {
			recordArray._setInternalModels(internalModels, payload);
		} else {
			recordArrays = store.recordArrayManager.createAdapterPopulatedRecordArray(modelName, query, internalModels, payload);
		}

		return recordArrays;
	}, null, `DS: Extract payload of query ${modelName}`);
}

/**
 * 事务处理（新增、修改、删除）
 * 连接后端
 * @param {String} url
 * @param {Ember Object/Adapter} adapter
 * @param {Ember Object/DS.Store} store
 * @param {String} modelName
 * @param {String} query
 * @returns {Promise}
 */
export function _transaction(url, adapter, store, modelName, query) {

	let modelClass = null, promise = null, label = '', serializer = null, payload = null;

	modelClass = store.modelFor(modelName);
	promise = adapter.transaction(url, store, modelClass, query);

	label = `DS: Handle Adapter#transaction of ${modelName}`;

	promise = Promise.resolve(promise, label);
	promise = _guard(promise, _bind(_objectIsAlive, store));

	return promise.then((adapterPayload) => {
		serializer = serializerForAdapter(store, adapter, modelName);
		payload = normalizeResponseHelper(serializer, store, modelClass, adapterPayload, null, 'transaction');
		return store._push(payload);
	}, null, `DS: Extract payload of transaction ${modelName}`);
}

/**
 *
 * @param {Ember Object/Serialize} serializeData
 * @returns {Object}
 */
export function _object2JsonApi(model) {
	let data = {}, modelIsArray = null;

	modelIsArray = isArray(model);

	if (modelIsArray) {
		let dataArray = [], includedArray = [];

		model.forEach(record => {
			let serializeData = record.serialize({ includeId: true });

			dataArray.push({
				id: serializeData.id,
				type: serializeData.type,
				attributes: serializeData.attributes,
				relationships: serializeData.relationships
			});
			serializeData.included.forEach(includedRecord => {
				let temp = includedArray.find(elem => elem.id === includedRecord.id && elem.type === includedRecord.type);

				if (!temp) {
					includedArray.push(...serializeData.included);
				}
			});
		});
		data = {
			data: dataArray,
			included: includedArray
		};
	} else {
		let serializeData = model.serialize({ includeId: true });

		data = {
			data: {
				id: serializeData.id,
				type: serializeData.type,
				attributes: serializeData.attributes,
				relationships: serializeData.relationships
			},
			included: serializeData.included
		};
	}
	return data;
}

/**
 * 创建Model
 * @param {Ember Object/DS.Store} store
 * @param {String} modelName
 * @param {Object} inputProperties
 */
export function _createModel(store, modelName, inputProperties) {
	return store.createRecord(modelName, inputProperties);
}

/**
 * 指定Model根据ID查询缓存
 * @param {Ember Object/DS.Store} store
 * @param {String*} modelName
 * @param {String} id
 */
export function _queryModelByID(store, modelName, id) {
	return store.peekRecord(modelName, id);
}

/**
 * 指定Model查询所有缓存
 * @param {Ember Object/DS.Store} store
 * @param {String} modelName
 */
export function _queryModelByAll(store, modelName) {
	return store.peekAll(modelName);
}

/**
 * 指定Model根据ID修改缓存
 * 未实现
 * @param {Ember Object/DS.Store} store
 * @param {String} modelName
 * @param {String} id
 * @param {Object} inputProperties
 */
export function _updataModelByID(store, modelName, id, inputProperties) {
	let record = null, keys = [];

	record = store.peekRecord(modelName, id);
	keys = Object.keys(inputProperties);

	keys.forEach(key => {
		record.set(key, inputProperties[key]);
	});
	return record;
}

/**
 * 指定Model根据ID删除缓存
 * @param {Ember Object/DS.Store} store
 * @param {String} modelName
 * @param {String} id
 */
export function _removeModelByID(store, modelName, id) {
	store.peekRecord(modelName, id).destroyRecord().then(rec => rec.unloadRecord());
}

/**
 * 指定Model删除所有缓存
 * @param {Ember Object/DS.Store} store
 * @param {String} modelName
 */
export function _removeModelByAll(store, modelName) {
	store.unloadAll(modelName);
}

// const observerModelToLocalStorge = EmberObject.create({

// });

export function _model2LocalStorge(modelClass) {
	let modelIsArray = null, temp = null;

	modelIsArray = isArray(modelClass);
	temp = _object2JsonApi(modelClass);

	if (modelIsArray) {
		// 监测涉及到深复制，先暂停
		// observerModelToLocalStorge.set(modelClass.get('firstObject')._internalModel.modelName, modelClass);
		// let {attributes, relationships} = modelClass.get('firstObject').serialize()
		// Object.keys(attributes).forEach(key => {

		// })
		// Object.keys(relationships).forEach(key => {

		// })
		// window.console.info(attributes)
		// window.console.info(relationships)
		// observerModelToLocalStorge.reopen({
		//     change: observer('mm.@each.token', function() {
		//         window.console.info(123)
		//     })
		// })
		localStorage.setItem(modelClass.get('firstObject')._internalModel.modelName, JSON.stringify(temp));
	} else {
		// observerModelToLocalStorge.set(modelClass._internalModel.modelName, modelClass);
		localStorage.setItem(modelClass._internalModel.modelName, JSON.stringify(temp));
	}
}

// export function _localStorage2Model(key) {

// }
