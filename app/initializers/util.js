import helper from 'pharbers-emberbasis-library/-private/util/helper';

export function initialize(application) {
	application.register('helper:main', helper);
	application.inject('route', 'helper', 'helper:main');
	application.inject('controller', 'helper', 'helper:main');
	application.inject('service', 'helper', 'helper:main');
	application.inject('component', 'helper', 'helper:main');
}

export default { name: 'helper', initialize };
