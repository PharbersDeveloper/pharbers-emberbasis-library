import DS from 'ember-data';
import { inject } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
    cookies: inject(),
    init() {
        this.set('headers', {
            "dataType": 'json',
            "contentType": 'application/json',
            "Content-Type": 'application/json'
        })
    },
    queryObject(url, store, type, jsonObject) {
        this.set('headers.Authorization', "bearer " + this.get('cookies').read('token'))
		return this.ajax(url, 'POST', { data: jsonObject});
	},
    queryMultipleObject(url, store, type, jsonObject) {
        this.set('headers.Authorization', "bearer " + this.get('cookies').read('token'))
		return this.ajax(url, 'POST', { data: jsonObject});
	},
    transaction(url, store, type, jsonObject) {
        this.set('headers.Authorization', "bearer " + this.get('cookies').read('token'))
		return this.ajax(url, 'POST', { data: jsonObject});
	},
});
