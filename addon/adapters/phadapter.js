/* eslint-disable new-cap */
import DS from 'ember-data';
import { inject } from '@ember/service';
import rsvp from 'rsvp';

export function invalidError(resolve, reject, data) {
	if (typeof data.errors !== 'undefined') {
		return reject(new DS.InvalidError(data.errors));
	}
	return resolve(data);
}

export default DS.JSONAPIAdapter.extend({
	namespace: '/',
	handleResponse() {
		// 500 501 - 504
		return this._super(...arguments);
	},
	init() {
		this.set('headers', {
			'dataType': 'json',
			'contentType': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `bearer 0`
		});
	},
	queryObject(url, store, type, jsonObject) {
		return new rsvp.Promise((resolve, reject) => {
			this.ajax(this.get('namespace') + url, 'POST', { data: jsonObject })
				.then(data => invalidError(resolve, reject, data))
				.catch(() => reject('failed'));
		});
	},
	queryMultipleObject(url, store, type, jsonObject) {
		return new rsvp.Promise((resolve, reject) => {
			this.ajax(this.get('namespace') + url, 'POST', { data: jsonObject })
				.then(data => invalidError(resolve, reject, data))
				.catch(() => reject('failed'));
		});
	},
	transaction(url, store, type, jsonObject) {
		return new rsvp.Promise((resolve, reject) => {
			this.ajax(this.get('namespace') + url, 'POST', { data: jsonObject })
				.then(data => invalidError(resolve, reject, data))
				.catch(() => reject('failed'));
		});
	}
});
