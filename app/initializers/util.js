import helper from 'pharbers-emberbasis-library/-private/util/helper';

export function initialize(application) {
	application.register('helpers:main', helper);
	application.inject('route', 'helpers', 'helpers:main');
	application.inject('controller', 'helpers', 'helpers:main');
	application.inject('service', 'helpers', 'helpers:main');
	application.inject('component', 'helpers', 'helpers:main');
}

export default { name: 'helpers', initialize };
