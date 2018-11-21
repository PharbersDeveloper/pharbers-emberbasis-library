import Service, { inject } from '@ember/service';

export default Service.extend({
	phinject: inject(),
	phserver: inject(),

	/**
	 * 查询单条数据
	 * @param {String} url
	 * @param {String} modelName
	 * @param {Object} condition
	 */
	queryObject(url, modelName, condition) {
		return this.get('phserver').queryObject(url, modelName, condition);
	},

	/**
	 * 查询多条数据
	 * @param {String} url
	 * @param {String} modelName
	 * @param {Object} condition
	 */
	queryMultipleObject(url, modelName, condition) {
		return this.get('phserver').queryMultipleObject(url, modelName, condition);
	},

	/**
	 * 增、删、改操作
	 * @param {String} url
	 * @param {String} modelName
	 * @param {Object} condition
	 */
	transaction(url, modelName, condition) {
		return this.get('phserver').transaction(url, modelName, condition);
	},

	/**
	 * 将本地Model序列化成JSAONAPI
	 * @param {Model Ember Object} model
	 * @param {Boolean} isClean
	 */
	object2JsonApi(model, isClean = true) {
		return this.get('phserver').object2JsonApi(model, isClean);
	},

	/**
	 * 注入Function
	 * @param {*} funcReference
	 */
	injectFunc(funcReference) {
		return this.get('phinject').injectFunc(funcReference);
	},

	/**
	 * 根据函数名称执行函数
	 * 前提是你需要通过上面的函数进行注入
	 * @param {String} funcName
	 * @param  {...不定参} arg
	 */
	getInjectFuncInstance(funcName, ...arg) {
		return this.get('phinject').getInjectFuncInstance(funcName, ...arg);
	}
});
