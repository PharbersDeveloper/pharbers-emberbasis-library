import Route from '@ember/routing/route';

/*
    // 查询单个
    this.get('pmController').get('Store').queryObject('url', 'modelName', 'condition');

    // 查询多个
    this.get('pmController').get('Store').queryMultipleObject('url', 'modelName', 'condition');

    // 事务查询（增、删、改）
    this.get('pmController').get('Store').transaction('url', 'modelName', 'condition');

    // 将Ember Model的实体序列化长JSONAPI
    this.get('pmController').get('Store').object2JsonApi(model);

    // 创建Ember Model
    this.get('pmController').get('Store').createModel('modelName', inputProperties);

    // 根据ID修改Ember Model
    this.get('pmController').get('Store').updataModelByID('modelName', 'id', inputProperties);

    // 根据ID查询Ember Model
    this.get('pmController').get('Store').queryModelByID('modelName', 'id');

    // 查询指定的ModelName所有数据
    this.get('pmController').get('Store').queryModelByAll('modelName')；

    // 根据ID删除Ember Model
    this.get('pmController').get('Store').removeModelByID('modelName', 'id');

    // 删除指定modelName所有数据
    this.get('pmController').get('Store').removeModelByAll('modelName', 'id');

    // 将Ember model 存入LocalStore
    this.get('pmController').get('Store').model2LocalStorge(model);

    // 打印log，
    this.get('logger').log('你的内容')

    // cookie操作
    this.get('cookie').write('key', 'value', option);
    this.get('cookie').read('key');
    this.get('cookie').clean(...args)(option)

    // 业务逻辑的注册
    this.get('pmController').get('BusinessLogic').funcInjection(Func)
    this.get('pmController').get('BusinessLogic').getFuncInstance('FuncName', ...args)
*/
export default Route.extend({
	setupController(controller, model) {
		this._super(controller, model);
		// this.controllerFor('application')
	},
	model() {

	},
	actions: {

	}
});
