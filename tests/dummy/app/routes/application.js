import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
    phservice: inject(),
    init() {
        this._super(...arguments);
    },
    model() {
        this.store.queryMultipleObject('/api/v1/login/0', 'auth', {})
        this.store.transaction('/api/v1/save/0', 'auth', {}).then(r => console.info(r.get('token')))
    }
});
