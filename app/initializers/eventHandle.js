import EventHandle from 'pharbers-emberbasis-library/-private/event-message-handler';

export function initialize(application) {
   
    application.register('eventHandle:main', EventHandle);
    application.inject('component', 'eventHandle', 'eventHandle:main');
}

export default { name: 'eventHandle', initialize };
