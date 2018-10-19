import Mixin from '@ember/object/mixin';
import rsa from 'node-rsa';

export default Mixin.create({
    initInstance(keyData) {
        this.set('Instance', new rsa(keyData))
    }
});