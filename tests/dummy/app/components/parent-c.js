import Component from '@ember/component';
import layout from '../templates/components/parent-c';

export default Component.extend({
    layout,
    actions: {
        current() {
            this.get('eventHandle').upAction(this, 'current', 'Fuck current')
        }
    }
});
