import EmberObject from '@ember/object';
import { inject } from '@ember/service';

export default EmberObject.extend({
    cookies: inject(),
    read(key) {
        this.get('cookies').read(key)
    },
    write(key, data, options) {
        this.get('cookies').write(key, data, options);
    },
    clean(...arg) {
        arg.forEach(key => {
            this.get('cookies').clean(key)
        });
    }
})