/* eslint-disable no-underscore-dangle */
import EmberObject from '@ember/object';
import { inject } from '@ember/service';

export default EmberObject.extend({
	cookies: inject(),
	/**
	 * cookie的读取
	 * @param {String} key
	 */
	cookieRead(key) {
		return this.get('cookies').read(key);
	},

	/**
	 * cookie的写入
	 * @param {String} key
	 * @param {Object} data
	 * @param {Object} options
	 */
	cookieWrite(key, data, options) {
		this.get('cookies').write(key, data, options);
	},

	/**
	 * cookie的清除
	 * @param  {...any} arg
	 */
	cookieClean(...arg) {
		let that = this;

		return function (option = {}) {
			arg.forEach(key => {
				that.get('cookies').clear(key, option);
			});
		};
	},

	/**
     * @param {*} objectArray 数组
     * @param {*} property 属性
     * @return 一个新的Object
     */
	groupBy(objectArray, property) {
		return objectArray.reduce(function (acc, obj) {
			let key = obj[property];

			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
	},
	/**
     *
     * @param {*} timestamp 时间戳
     * @param {*} format 格式化字符串
     * @return 格式化后的日期字符串
     */
	dataFormat: function (timestamp, format) {
		let data = new Date(timestamp), result = '';
		var o = {
			'M+': data.getMonth() + 1, //月份
			'd+': data.getDate(), //日
			'h+': data.getHours(), //小时
			'm+': data.getMinutes(), //分
			's+': data.getSeconds(), //秒
			'q+': Math.floor((data.getMonth() + 3) / 3), //季度
			'S': data.getMilliseconds() //毫秒
		};

		if (/(y+)/.test(format)) {
			result = format.replace(RegExp.$1, data.getFullYear().toString().substr(4 - RegExp.$1.length));
		}
		for (let k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				result = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(o[k].toString().length));
			}
		}
		return result;
	},
	/**
     *
     * @param {*} number 数字
     * @return 千分位的字符串
     */
	numberThousands(params) {
		let p = null,
			zznf = /([-+]?)(\d*)(\.\d+)?/g,
			groups = null,
			mask = null, //符号位
			integers = null, //整数部分
			decimal = '', //小数部分
			remain = null,
			temp = null;

		p = params.toString().replace(/[,，、]/g, '');
		groups = zznf.exec(p.toString());
		mask = groups[1]; //符号位
		integers = (groups[2] || '').split(''); //整数部分
		decimal = groups[3] || ''; //小数部分
		remain = integers.length % 3;

		if (isNaN(p)) {
			return p;
		}

		temp = integers.reduce(function (previousValue, currentValue, index) {
			if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
				return previousValue + currentValue + ',';
			}
			return previousValue + currentValue;
		}, '').replace(/,$/g, '');
		return mask + temp + decimal;
	}
});
