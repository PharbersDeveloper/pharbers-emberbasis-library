import cookie from 'pharbers-emberbasis-library/-private/cookies';

export function initialize(application) {
   
    application.register('cookie:main', cookie);
    application.inject('route', 'cookie', 'cookie:main');
    application.inject('controller', 'cookie', 'cookie:main');
    application.inject('service', 'cookie', 'cookie:main');
    application.inject('component', 'cookie', 'cookie:main');
    
}

export default { name: 'cookie', initialize };
