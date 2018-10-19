// import Ember from 'ember';
// import { A } from '@ember/array';
// import { Promise } from 'rsvp';
// import { assert, warn } from '@ember/debug';
// import { copy } from '@ember/object/internals';
// import { typeOf, isPresent, isNone } from '@ember/utils';

import {
	_bind,
	_guard,
	_objectIsAlive
} from "./store-common";

import { normalizeResponseHelper } from "./serializer-response";
import { serializerForAdapter } from "./serializers";

/**
 * 只做了2件事 监测绑定store与adapter转向代理方法的封装
 * 这是个封装的工具包
 */
export function _queryObject(url, adapter, store, modelName, query) {

	let modelClass = store.modelFor(modelName);
	let promise = adapter.queryObject(url, store, modelClass, query);

	let label = `DS: Handle Adapter#queryObject of ${modelName}`;

	promise = Promise.resolve(promise, label);
	promise = _guard(promise, _bind(_objectIsAlive, store));

	return promise.then((adapterPayload) => {

		let serializer = serializerForAdapter(store, adapter, modelName);
		let payload = normalizeResponseHelper(serializer, store, modelClass, adapterPayload, null, 'queryObject'); 

		return store._push(payload);
	}, null, `DS: Extract payload of queryObject ${modelName}`)
}

export function _queryMultipleObject(url, adapter, store, modelName, query, recordArray) {
	let modelClass = store.modelFor(modelName);

	let promise;
	if (adapter.queryMultipleObject.length > 4) {
		recordArray = recordArray || store.recordArrayManager.createAdapterPopulatedRecordArray(modelName, query);
		promise = adapter.queryMultipleObject(url, store, modelClass, query, recordArray);
	} else {
		promise = adapter.queryMultipleObject(url, store, modelClass, query);
	}

	let label = `DS: Handle Adapter#queryMultipleObject of ${modelClass}`;

	promise = Promise.resolve(promise, label);
	promise = _guard(promise, _bind(_objectIsAlive, store));

	return promise.then(adapterPayload => {
		let serializer = serializerForAdapter(store, adapter, modelName);
		let payload = normalizeResponseHelper(serializer, store, modelClass, adapterPayload, null, 'queryMultipleObject');
		let internalModels = store._push(payload);

		if (recordArray) {
			recordArray._setInternalModels(internalModels, payload);
		} else {
			recordArray = store.recordArrayManager.createAdapterPopulatedRecordArray(modelName, query, internalModels, payload);
		}

		return recordArray;
	}, null, `DS: Extract payload of query ${modelName}`);
}

export function _transaction(url, adapter, store, modelName, query) {

	let modelClass = store.modelFor(modelName);
	let promise = adapter.transaction(url, store, modelClass, query);

	let label = `DS: Handle Adapter#transaction of ${modelName}`;

	promise = Promise.resolve(promise, label);
	promise = _guard(promise, _bind(_objectIsAlive, store));

	return promise.then((adapterPayload) => {

		let serializer = serializerForAdapter(store, adapter, modelName);
		let payload = normalizeResponseHelper(serializer, store, modelClass, adapterPayload, null, 'transaction');

		return store._push(payload);
	}, null, `DS: Extract payload of transaction ${modelName}`)
}
