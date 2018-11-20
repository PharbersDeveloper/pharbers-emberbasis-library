import Service, { inject } from '@ember/service';

export default Service.extend({
	phstore: inject(),

	/**
	 * 查询单条数据
	 * @param {String} url
	 * @param {String} modelName
	 * @param {Object} condition
	 */
	queryObject(url, modelName, condition) {
		return this.get('phstore').queryObject(url, modelName, condition);
	},

	/**
	 * 查询多条数据
	 * @param {String} url
	 * @param {String} modelName
	 * @param {Object} condition
	 */
	queryMultipleObject(url, modelName, condition) {
		return this.get('phstore').queryMultipleObject(url, modelName, condition);
	},

	/**
	 * 增、删、改操作
	 * @param {String} url
	 * @param {String} modelName
	 * @param {Object} condition
	 */
	transaction(url, modelName, condition) {
		return this.get('phstore').transaction(url, modelName, condition);
	},

	/**
	 * 创建Model
	 * 该方法只在客户端创建数据
	 * @param {String} modelName
	 * @param {Object} inputProperties
	 */
	createModel(modelName, inputProperties) {
		return this.get('phstore').createModel(modelName, inputProperties);
	},

	/**
	 * 根据ID的查询Model中数据
	 * @param {String} modelName
	 * @param {String | Number} id
	 */
	queryModelByID(modelName, id) {
		return this.get('phstore').queryModelByID(modelName, id);
	},

	/**
	 * 根据Model的名称查询所有数据
	 * @param {String} modelName
	 */
	queryModelByAll(modelName) {
		return this.get('phstore').queryModelByAll(modelName);
	},

	/**
	 * 根据ID的删除Model数据
	 * @param {String} modelName
	 * @param {String | Number} id
	 */
	removeModelByID(modelName, id) {
		return this.get('phstore').removeModelByID(modelName, id);
	},

	/**
	 * 根据Model名称删除所有数据
	 * @param {String} modelName
	 */
	removeModelByAll(modelName) {
		return this.get('phstore').removeModelByAll(modelName);
	},

	/**
	 * 根据ID修改Model中的数据
	 * @param {String} modelName
	 * @param {String | Number} id
	 * @param {Object} inputProperties
	 */
	updataModelByID(modelName, id, inputProperties) {
		return this.get('phstore').updataModelByID(modelName, id, inputProperties);
	},

	/**
	 * 将本地Model序列化成JSAONAPI
	 * @param {Model Ember Object} model
	 * @param {Boolean} isClean
	 */
	object2JsonApi(model, isClean = true) {
		return this.get('phstore').object2JsonApi(model, isClean);
	},

	/**
	 * 注入Function
	 * @param {*} funcReference
	 */
	injectFunc(funcReference) {
		return this.get('phstore').injectFunc(funcReference);
	},

	/**
	 * 根据函数名称执行函数
	 * 前提是你需要通过上面的函数进行注入
	 * @param {String} funcName
	 * @param  {...不定参} arg
	 */
	getInjectFuncInstance(funcName, ...arg) {
		return this.get('phstore').getInjectFuncInstance(funcName, ...arg);
	}
});
