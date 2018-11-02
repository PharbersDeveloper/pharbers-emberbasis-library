import EmberObject from '@ember/object';
import { inject } from '@ember/service';

export default EmberObject.extend({
    cookies: inject(),
    read(key) {
        return this.get('cookies').read(key)
    },
    write(key, data, options) {
        this.get('cookies').write(key, data, options);
    },
    clean(...arg) {
        let _this = this;
        return function(option = {}) {
            arg.forEach(key => {
                _this.get('cookies').clear(key, option)
            });
        }
    }
})