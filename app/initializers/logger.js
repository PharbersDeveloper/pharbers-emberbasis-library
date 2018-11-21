/* eslint-disable one-var */
import EmberObject from '@ember/object';
import env from '../config/environment';

export function initialize(application) {
	// eslint-disable-next-line no-unneeded-ternary
	let environment = env.environment === 'production' ? false : true;
	let Logger = EmberObject.extend({
		log(m) {
			if (environment) {
				window.console.log(m);
			}
		},
		warn(m) {
			if (environment) {
				window.console.warn(m);
			}
		},
		error(m) {
			if (environment) {
				window.console.error(m);
			}
		}
	});

	application.register('logger:main', Logger);

	application.inject('route', 'logger', 'logger:main');
	application.inject('component', 'logger', 'logger:main');
	application.inject('controller', 'logger', 'logger:main');
	application.inject('service', 'logger', 'logger:main');
}

export default { name: 'logger', initialize };
