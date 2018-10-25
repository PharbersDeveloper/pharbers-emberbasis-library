import Component from '@ember/component';
import layout from '../../templates/components/parent-c/child-c';

export default Component.extend({
    layout,
    actions: {
        Child() {
            this.get('eventHandle').upAction(this, 'next', 'Fuck Component')
        }
    }
});
