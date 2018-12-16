import PharbersAdapter from 'pharbers-emberbasis-library/adapters/phadapter';

export default PharbersAdapter.extend({
	namespace: '/',
	init() {
		this.set('headers', {
			'dataType': 'json',
			'contentType': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `bearer ${this.get('cookie').read('token')}`
		});
	}
});
