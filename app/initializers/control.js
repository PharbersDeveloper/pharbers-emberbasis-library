import phcontrol from 'pharbers-emberbasis-library/-private/pharbers-control';

export function initialize(application) {
	application.register('phcontrol:main', phcontrol);
	application.inject('route', 'pmController', 'phcontrol:main');
	application.inject('controller', 'pmController', 'phcontrol:main');
	application.inject('service', 'pmController', 'phcontrol:main');
}

export default { name: 'pmController', initialize };
