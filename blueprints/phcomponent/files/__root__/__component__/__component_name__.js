import Component from '@ember/component';

/*
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
