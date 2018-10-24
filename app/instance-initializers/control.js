export function initialize(applicationInstance) {
    applicationInstance.inject('route', 'pmController', 'service:private.phservice');
    applicationInstance.inject('controller', 'pmController', 'service:private.phservice');

}

export default { name: 'pmController', initialize };