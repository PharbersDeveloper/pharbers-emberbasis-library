import EmberObject from '@ember/object';
import { inject } from '@ember/service';


export default EmberObject.extend({
    // RSA加密解密 Service
    RSA: inject('private.rsa.rsa'),

    // XMPP聊天 Service
    XMPP: inject('private.xmpp.xmpp'),

    // Ember Data的扩展封装 Service
    Store: inject('store'),

    // 商务逻辑Service Business logic
    BusinessLogic: inject('private.business.buslogic')
})