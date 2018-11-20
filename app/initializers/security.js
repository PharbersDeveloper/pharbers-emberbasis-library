import rsa from 'pharbers-emberbasis-library/-private/util/security/rsa/rsa';

export function initialize(application) {
	application.register('rsa:main', rsa);
	application.inject('route', 'rsa', 'rsa:main');
	application.inject('controller', 'rsa', 'rsa:main');
	application.inject('service', 'rsa', 'rsa:main');
}

export default { name: 'rsa', initialize };
