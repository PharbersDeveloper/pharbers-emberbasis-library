import DS from 'ember-data';
import normalizeModelName from '../-private/normalize-model-name';
import { isArray } from '@ember/array';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';


import {
	promiseArray,
	promiseObject
} from '../-private/promise-proxies';

import {
	_queryObject,
	_queryMultipleObject,
	_transaction,
	_object2JsonApi,
	_createModel,
	_updataModelByID,
	_queryModelByAll,
	_queryModelByID,
	_removeModelByAll,
	_removeModelByID,
	_model2LocalStorge
} from '../-private/store-finders';

/**
 * 重新扩展DS.Stroe方法
 */
export default DS.Store.extend({

	init() {
		this._super(...arguments);
		window.console.log('The Custom DS.Store Init()');
	},

	__queryObject(url, modelName, jsonObject) {
		let normalizedModelName = normalizeModelName(modelName), adapter = this.adapterFor(normalizedModelName);

		assert(`you must implement 'queryObject' in your ${modelName} Adapter`, typeof adapter.queryObject === 'function');
		return promiseObject(
			_queryObject(url,
				adapter,
				this,
				modelName,
				jsonObject)
				.then(internalModel => {
					if (internalModel) {
						return internalModel.getRecord();
					}
					return null;
				}));
	},

	__queryMultipleObject(url, modelName, jsonObject) {
		assert(`You need to pass a model name: ${modelName} to the store's queryMultipleObject method`, isPresent(modelName));
		assert(`You need to pass a queryMultipleObject hash to the store's queryMultipleObject method`, jsonObject);
		assert(`Passing classes to store methods has been removed. Please pass a dasherized string instead of ${modelName}`, typeof modelName === 'string');
		let normalizedModelName = normalizeModelName(modelName), adapter = this.adapterFor(normalizedModelName);

		assert(`You tried to load a queryMultipleObject but your ${modelName} adapter does not implement 'queryMultipleObject'`, typeof adapter.queryMultipleObject === 'function');
		return promiseArray(
			_queryMultipleObject(url,
				adapter,
				this,
				normalizedModelName,
				jsonObject,
				// eslint-disable-next-line no-undefined
				undefined));
	},

	__transaction(url, modelName, jsonObject) {
		let normalizedModelName = normalizeModelName(modelName), adapter = this.adapterFor(normalizedModelName);

		assert(`you must implement 'transaction' in your ${modelName} Adapter`, typeof adapter.transaction === 'function');
		return promiseObject(
			_transaction(url,
				adapter,
				this,
				modelName,
				jsonObject)
				.then(internalModel => {
					if (internalModel) {
						return internalModel.getRecord();
					}
					return null;
				}));
	},

	/**
	 * 删除model包括关联关系
	 * @param {*} store
	 * @param {*} recordData
	 */
	__cleanModel(store, recordData) {
		const MODELID = recordData.id, TYPE = recordData.type, RELATIONSHIPS = recordData.relationships || {};

		store.peekRecord(TYPE, MODELID).unloadRecord();//destroyRecord().then(rec => rec.unloadRecord());
		Object.keys(RELATIONSHIPS).forEach(elem => {
			let temp = RELATIONSHIPS[elem].data;

			if (Array.isArray(temp)) {
				temp.forEach(d => {
					store.peekRecord(d.type, d.id).unloadRecord();//destroyRecord().then(rec => rec.unloadRecord());
				});
			} else {
				store.peekRecord(temp.type, temp.id).unloadRecord();//.destroyRecord().then(rec => rec.unloadRecord());
			}
		});
	},

	/**
     * 通过Ember的CreateRecord创建数据关系，再利用此Function 进行数据的serialize 最后拼装成JSONAPI的形式
     * @param {Ember Model} model
     * @param {Boolean} isClean
     */
	__object2JsonApi(model, isClean = true) {
		let data = _object2JsonApi(model), modelIsArray = isArray(model);

		if (modelIsArray) {
			model.forEach(reocrd => {
				if (isClean) {
					this.__cleanModel(model.store, reocrd.serialize({ includeId: true }));
				}
			});
		}
		if (isClean) {
			this.__cleanModel(model.store, model.serialize({ includeId: true }));
		}
		return data;
	},

	/**
     * 创建Model
     * @param {String} modelName
     * @param {Object} inputProperties
     */
	__createModel(modelName, inputProperties) {
		return _createModel(this, modelName, inputProperties);
	},

	__updataModelByID(modelName, id, inputProperties) {
		return _updataModelByID(this, modelName, id, inputProperties);
	},
	/**
     *
     * @param {String} modelName
     * @param {String} id
     */
	__queryModelByID(modelName, id) {
		return _queryModelByID(this, modelName, id);
	},

	/**
     *
     * @param {String} modelName
     */
	__queryModelByAll(modelName) {
		return _queryModelByAll(this, modelName);
	},

	/**
     *
     * @param {String} modelName
     * @param {String} id
     */
	__removeModelByID(modelName, id) {
		_removeModelByID(this, modelName, id);
	},

	/**
     *
     * @param {String} modelName
     */
	__removeModelByAll(modelName) {
		_removeModelByAll(this, modelName);
	},

	/**
     *
     * @param {Model} modelClass
     */
	__model2LocalStorge(modelClass) {
		_model2LocalStorge(modelClass);
	}
});
