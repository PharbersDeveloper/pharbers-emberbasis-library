import Service, { inject } from '@ember/service';

export default Service.extend({
	phinject: inject(),
	phcache: inject(),

	/**
	 * 创建Model
	 * 该方法只在客户端创建数据
	 * @param {String} modelName
	 * @param {Object} inputProperties
	 */
	createModel(modelName, inputProperties) {
		return this.get('phcache').createModel(modelName, inputProperties);
	},

	/**
	 * 根据ID的查询Model中数据
	 * @param {String} modelName
	 * @param {String | Number} id
	 */
	queryModelByID(modelName, id) {
		return this.get('phcache').queryModelByID(modelName, id);
	},

	/**
	 * 根据Model的名称查询所有数据
	 * @param {String} modelName
	 */
	queryModelByAll(modelName) {
		return this.get('phcache').queryModelByAll(modelName);
	},

	/**
	 * 根据ID的删除Model数据
	 * @param {String} modelName
	 * @param {String | Number} id
	 */
	removeModelByID(modelName, id) {
		return this.get('phcache').removeModelByID(modelName, id);
	},

	/**
	 * 根据Model名称删除所有数据
	 * @param {String} modelName
	 */
	removeModelByAll(modelName) {
		return this.get('phcache').removeModelByAll(modelName);
	},

	/**
	 * 根据ID修改Model中的数据
	 * @param {String} modelName
	 * @param {String | Number} id
	 * @param {Object} inputProperties
	 */
	updataModelByID(modelName, id, inputProperties) {
		return this.get('phcache').updataModelByID(modelName, id, inputProperties);
	},

	/**
	 * 重置Model中的Attr数据
	 * 为什么需要这一步？原因是为了适应取消按钮，点击按钮，重置修改过的attr，重置后的内容为第一次加载或创建的attr的value
	 * @param {Model Ember Object} model
	 */
	resetChangedModelAttr(model) {
		return this.get('phcache').resetChangedModelAttr(model);
	},

	/**
	 * 将Model序列化成JSONAPI的形式存入LocalStore中key为Model的名字
	 * @param {Model Ember Object} model
	 */
	model2LocalStorge(model) {
		return this.get('phcache').model2LocalStorge(model);
	},

	/**
	 * 将查处的Model删除包括所关联的Model，全部删除一个不留
	 * @param {Model Ember Object} model
	 */
	cleanModelInclusionRelation(model) {
		return this.get('phcache').cleanModelInclusionRelation(model);
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
