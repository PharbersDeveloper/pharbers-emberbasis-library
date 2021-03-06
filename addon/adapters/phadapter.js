import DS from 'ember-data';
import { inject } from '@ember/service';
import rsvp from 'rsvp';

export function InvalidError(resolve, reject, data) {
    if (data.errors !== undefined) {
        return reject(new DS.InvalidError(data.errors))
    } else {
        return resolve(data);
    }
}

export default DS.JSONAPIAdapter.extend({
    cookies: inject(),
    handleResponse() {
        // 500 501 - 504
        return this._super(...arguments);
    },
    init() {
        this.set('headers', {
            "dataType": 'json',
            "contentType": 'application/json',
			"Content-Type": 'application/json',
			'Authorization': `bearer 0`
        })
    },
    queryObject(url, store, type, jsonObject) {
        return new rsvp.Promise((resolve, reject) => {
            this.ajax(url, 'POST', { data: jsonObject })
                .then(data => InvalidError(resolve, reject, data))
                .catch(() => reject('failed'))
        });
    },
    queryMultipleObject(url, store, type, jsonObject) {
        return new rsvp.Promise((resolve, reject) => {
            this.ajax(url, 'POST', { data: jsonObject })
                .then(data => InvalidError(resolve, reject, data))
                .catch(() => reject('failed'))
        });
    },
    transaction(url, store, type, jsonObject) {
        return new rsvp.Promise((resolve, reject) => {
            this.ajax(url, 'POST', { data: jsonObject })
                .then(data => InvalidError(resolve, reject, data))
                .catch(() => reject('failed'))
        });
    },
});
