import DS from 'ember-data';
import normalizeModelName from "../-private/normalize-model-name";
import { isArray } from '@ember/array';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';


import {
    promiseArray,
    promiseObject
} from "../-private/promise-proxies";

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
} from "../-private/store-finders";

/**
 * 重新扩展DS.Stroe方法
 */
export default DS.Store.extend({

    init() {
        this._super(...arguments)
        window.console.log("The Custom DS.Store Init()")
    },

    queryObject(url, modelName, jsonObject) {
        let normalizedModelName = normalizeModelName(modelName);
        let adapter = this.adapterFor(normalizedModelName);
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

    queryMultipleObject(url, modelName, jsonObject) {
        assert(`You need to pass a model name: ${modelName} to the store's queryMultipleObject method`, isPresent(modelName));
        assert(`You need to pass a queryMultipleObject hash to the store's queryMultipleObject method`, jsonObject);
        assert(`Passing classes to store methods has been removed. Please pass a dasherized string instead of ${modelName}`, typeof modelName === 'string');
        let normalizedModelName = normalizeModelName(modelName);
        let adapter = this.adapterFor(normalizedModelName);
        assert(`You tried to load a queryMultipleObject but your ${modelName} adapter does not implement 'queryMultipleObject'`, typeof adapter.queryMultipleObject === 'function');
        return promiseArray(
            _queryMultipleObject(url,
                adapter,
                this,
                normalizedModelName,
                jsonObject,
                undefined));
    },

    transaction(url, modelName, jsonObject) {
        let normalizedModelName = normalizeModelName(modelName);
        let adapter = this.adapterFor(normalizedModelName);
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


    // object2JsonApi(modelName, modelObj, isClean = true) {

    // 	function relationshipIsNull(o) {
    // 		let _relationships = o._internalModel.__relationships;
    // 		if (_relationships === null ) {
    // 			return { status: false, value: null, keys: []}
    // 		}
    // 		let relationshipsObject = _relationships.initializedRelationships;
    // 		if (Object.keys(relationshipsObject).length === 0) {
    // 			return { status: false, value: null, keys: []}
    // 		} else {
    // 			return { status: true, value: relationshipsObject, keys: Object.keys(relationshipsObject)}
    // 		}
    // 	}
    // 	function relationshipDataIsNull(value) {
    // 		return value === null || Object.keys(value).length === 0  ? false : true
    // 	}
    // 	function belongsToType(value) {
    // 		return value.relationshipMeta.kind === 'belongsTo'
    // 	}
    // 	function hasManyType(value) {
    // 		return value.relationshipMeta.kind === 'hasMany'
    // 	}
    // 	function deleteNullRelationship() {
    // 		if (json.data.relationships === undefined || Object.keys(json.data.relationships).length === 0 ) {
    // 			delete json.data.relationships
    // 		} if (json.data.relationships === undefined || json.included.length === 0 ){
    // 			delete json.included
    // 		}
    // 	}
    // 	function cleanModel(model, name) {
    // 		let reVal = model.store.peekAll(name)
    // 		reVal.forEach(elem => {
    // 			elem.destroyRecord().then( rec => rec.unloadRecord());
    // 		})
    // 	}

    // 	let number = 0;
    // 	let json = modelObj.serialize();
    // 	json.data.id = modelObj.get('id') || "-1";

    // 	let rsps = relationshipIsNull(modelObj)

    // 	if (rsps.status) {
    // 		json.data.relationships = {};
    // 		json.included = [];
    // 		let rdata = null;
    // 		rsps.keys.forEach((elem) => {
    // 			if (belongsToType(rsps.value[elem]) && relationshipDataIsNull(modelObj.get(elem))) {
    // 				let attributes = modelObj.get(elem).serialize().data.attributes
    // 				let type = modelObj.get(elem).serialize().data.type
    // 				rdata = json.data.relationships[elem] = {};
    // 				rdata.data = {
    // 					id: modelObj.get(elem).get('id') || number + "",
    // 					type
    // 				};
    // 				json.included.push({
    // 					id: modelObj.get(elem).get('id') || number + "",
    // 					type,
    // 					attributes
    // 				})
    // 				if(isClean) {cleanModel(modelObj.get(elem), elem)}

    // 			} else if (hasManyType(rsps.value[elem])) {
    // 				if(relationshipDataIsNull(rsps.value[elem])) {
    // 					modelObj.get(elem).forEach((ele, index) => {
    // 						if (index === 0 ) {
    // 							rdata = json.data.relationships[elem] = {};
    // 							rdata.data = [];
    // 						}
    // 						let attributes = ele.serialize().data.attributes
    // 						let type = ele.serialize().data.type
    // 						rdata.data.push({
    // 							id: ele.get('id') || index + "",
    // 							type
    // 						})
    // 						json.included.push({
    // 							id: ele.get('id') || index + "",
    // 							type,
    // 							attributes
    // 						})
    // 					})
    // 				}
    // 			}
    // 			if(isClean) {cleanModel(modelObj, elem)}
    // 			number++
    // 		})
    // 	} else {
    // 		deleteNullRelationship()
    // 		if(isClean) {cleanModel(modelObj, modelName)}
    // 		return json;
    // 	}
    // 	deleteNullRelationship()
    // 	if(isClean) {cleanModel(modelObj, modelName)}
    // 	return json;
    // },

    // modelDeepParsing(modelName, modelObj) {
    //     let json = modelObj.serialize();
    //     json.data.id = modelObj.get('id') || "-1";
    //     json.included = [];
    //     let number = 0;
    //     function relationshipIsNull(o) {
    // 		let _relationships = o._internalModel.__relationships;
    // 		if (_relationships === null ) {
    // 			return { status: false, value: null, keys: []}
    // 		}
    // 		let relationshipsObject = _relationships.initializedRelationships;
    // 		if (Object.keys(relationshipsObject).length === 0) {
    // 			return { status: false, value: null, keys: []}
    // 		} else {
    // 			return { status: true, value: relationshipsObject, keys: Object.keys(relationshipsObject)}
    // 		}
    // 	}
    // 	function relationshipDataIsNull(value) {
    // 		return value === null || Object.keys(value).length === 0  ? false : true
    // 	}
    // 	function belongsToType(value) {
    // 		return value.relationshipMeta.kind === 'belongsTo'
    // 	}
    // 	function hasManyType(value) {
    // 		return value.relationshipMeta.kind === 'hasMany'
    // 	}
    // 	function deleteNullRelationship() {
    // 		if (json.data.relationships === undefined || Object.keys(json.data.relationships).length === 0 ) {
    // 			delete json.data.relationships
    // 		} if (json.data.relationships === undefined || json.included.length === 0 ){
    // 			delete json.included
    // 		}
    // 	}


    //     relationshipRecursive(modelObj, modelName)

    //     function relationshipRecursive(model) {
    //         let rsps = relationshipIsNull(model) 
    //         if (rsps.status){
    //             rsps.keys.forEach(key => {
    //                 if (relationshipDataIsNull(model.get(key)) && belongsToType(rsps.value[key])) {
    //                     relationshipRecursive(model.get(key), key)
    //                 } else if (relationshipDataIsNull(model.get(key)) && hasManyType(rsps.value[key])) {
    //                     model.get(key).forEach((recordModel, index) => {
    //                         let attributes = recordModel.serialize().data.attributes;
    //                         let type = recordModel.serialize().data.type;
    //                         let relationships = recordModel.serialize().data.relationships
    //                         let temp = json.included.filter((elem) => {
    //                             return elem.id == recordModel.get('id') && elem.type == type 
    //                         })
    //                         if(!temp.length) {
    //                             json.included.push({
    //                                 id: recordModel.get('id') || index + "",
    //                                 type,
    //                                 attributes,
    //                                 relationships
    //                             })
    //                         }
    //                         relationshipRecursive(recordModel, key)
    //                     })
    //                 }
    //             });
    //         } else {
    //             let attributes = model.serialize().data.attributes;
    //             let type = model.serialize().data.type;
    //             let temp = json.included.filter((elem) => {
    //                 return elem.id == model.get('id') && elem.type == type 
    //             })
    //             if(!temp.length) {
    //                 json.included.push({
    //                     id: model.get('id') || number + "",
    //                     type,
    //                     attributes
    //                 })
    //             }
    //         }
    //         number++
    //     }
    // 	deleteNullRelationship()
    // 	return json;
    // },

    /**
     * 通过Ember的CreateRecord创建数据关系，再利用此Function 进行数据的serialize 最后拼装成JSONAPI的形式
     * @param {Ember Model} model 
     * @param {Boolean} isClean 
     */
    object2JsonApi(model, isClean = true) {
        function cleanModel(recordData) {
            const MODELID = recordData.id;
            const TYPE = recordData.type;
            const RELATIONSHIPS = recordData.relationships || {};
            model.store.peekRecord(TYPE, MODELID).destroyRecord().then(rec => rec.unloadRecord());
            Object.keys(RELATIONSHIPS).forEach(elem => {
                let temp = RELATIONSHIPS[elem].data;
                if (Array.isArray(temp)) {
                    temp.forEach(d => {
                        model.store.peekRecord(d.type, d.id).destroyRecord().then(rec => rec.unloadRecord());
                    })
                } else {
                    model.store.peekRecord(temp.type, temp.id).destroyRecord().then(rec => rec.unloadRecord());
                }
            })
        }
        let data = _object2JsonApi(model);
        let modelIsArray = isArray(model)
        if (modelIsArray) {
            model.forEach(reocrd => {
                if (isClean) { cleanModel(reocrd.serialize({ includeId: true })) }
            })
        } else {
            if (isClean) { cleanModel(model.serialize({ includeId: true })) }
        }
        return data
    },

    /**
     * 创建Model
     * @param {String} modelName 
     * @param {Object} inputProperties 
     */
    createModel(modelName, inputProperties) {
        return _createModel(this, modelName, inputProperties);
    },

    updataModelByID(modelName, id, inputProperties) {
        return _updataModelByID(this, modelName, id, inputProperties)
    },
    /**
     * 
     * @param {String} modelName 
     * @param {String} id 
     */
    queryModelByID(modelName, id) {
        return _queryModelByID(this, modelName, id);
    },

    /**
     * 
     * @param {String} modelName 
     */
    queryModelByAll(modelName) {
        return _queryModelByAll(this, modelName);
    },

    /**
     * 
     * @param {String} modelName 
     * @param {String} id 
     */
    removeModelByID(modelName, id) {
        _removeModelByID(this, modelName, id);
    },

    /**
     * 
     * @param {String} modelName 
     */
    removeModelByAll(modelName) {
        _removeModelByAll(this, modelName);
    },

    /**
     * 
     * @param {Model} modelClass 
     */
    model2LocalStorge(modelClass) {
        _model2LocalStorge(modelClass)
    }
});
