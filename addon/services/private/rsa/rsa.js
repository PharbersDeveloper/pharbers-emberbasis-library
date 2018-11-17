import Service from '@ember/service';
import Base from './rsa-base';

export default Service.extend(Base, {
	init() {
		this._super(...arguments);
		this.initInstance();
	},
	publicKey: '',
	privateKey: '',

	/**
     * 设置公钥
     * @param {String} publickey
     */
	setPublicKey(publickey) {
		this.set('publicKey',
			this.get('RSAInstance').setPublicKey(publickey)
		);
	},

	/**
     * 设置私钥
     * @param {String} privatekey
     */
	setPrivateKey(privatekey) {
		this.set('privateKey',
			this.get('RSAInstance').setPrivateKey(privatekey)
		);
	},

	/**
     * 内容加密 (短)
     * @param {String} content
     * @returns {String} 密文
     */
	encrypt(content) {
		return this.get('RSAInstance').encrypt(content);
	},

	/**
     * 加密内容（长）
     * @param {String} content
     * @returns {String} 密文
     */
	encryptLong(content) {
		return this.encryptLong2(content);
	},

	/**
     * 内容解密（长）
     * @param {String} encryptContent
     * @returns {String} 解密
     */
	decryptLong(encryptContent) {
		return this.decryptLong2(encryptContent);
	},

	/**
     * 内容解密 (短)
     * @param {String} encryptContent
     * @returns {String} 解密
     */
	decrypt(encryptContent) {
		return this.get('RSAInstance').decrypt(encryptContent);
	}
});
