import PharbersAdapter from 'pharbers-emberbasis-library/adapters/phadapter';
import cookie from 'pharbers-ember-util-package/cookies';

export default PharbersAdapter.extend({
	namespace: '/',
	init() {
		this.set('headers', {
			'dataType': 'json',
			'contentType': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `bearer ${cookie.create().read('token')}`
		});
	}
});
