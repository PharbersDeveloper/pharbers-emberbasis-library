import Service from '@ember/service';

/*
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

export default Service.extend({
    init() {
        this._super(...arguments);
    }
});
