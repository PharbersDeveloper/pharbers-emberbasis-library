import util from 'pharbers-emberbasis-library/-private/util';

export function initialize(application) {
	application.register('util:main', util);
	application.inject('route', 'util', 'util:main');
	application.inject('controller', 'util', 'util:main');
	application.inject('service', 'util', 'util:main');
	application.inject('component', 'util', 'util:main');
}

export default { name: 'util', initialize };
