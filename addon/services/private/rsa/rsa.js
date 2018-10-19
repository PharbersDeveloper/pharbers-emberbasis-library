import Service from '@ember/service';
import Base from './rsa-base';

export default Service.extend(Base, {
    init() {
        this._super(...arguments);
        this.initInstance({ b: 1024 });
    },
    /**
     * 设置公钥到实例中
     * @param {导入公钥} key 
     */
    importKey(key, format) {
        this.get('Instance').importKey(key, format);
    },

    /**
     * 加密
     * @param {内容} content 
     * @param {加密类型：`base64`} type 
     */
    encrypt(content, type) {
        return this.get('Instance').encrypt(content, type)
    },

    /**
     * 解密
     * @param {内容} content 
     * @param {解密类型：`utf-8`} type 
     */
    decrypt(content, type) {
        return this.get('Instance').decrypt(content, type)
    }
});