export function initialize(application) {
	application.inject('component', 'eventHandle', 'service:event-message-handler');
}

export default { name: 'eventHandle', initialize };
