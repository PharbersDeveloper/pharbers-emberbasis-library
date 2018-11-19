import Component from '@ember/component';

/*
    // 打印log，
    this.get('logger').log('你的内容')

    // cookie操作
    this.get('cookie').write('key', 'value', option);
    this.get('cookie').read('key');
    this.get('cookie').clean(...args)(option)

    // 冒泡发送Event 用法与this.sendAction()相同
    this.get('eventHandle').upAction(this, 'actionName', ...args);
*/
export default Component.extend({
	init() {
		this._super(...arguments);
	},
	actions: {

	}
});
