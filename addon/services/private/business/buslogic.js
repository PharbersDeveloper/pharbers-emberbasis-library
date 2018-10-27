import Service from '@ember/service';
import { A } from '@ember/array';
import { assert } from '@ember/debug';

export default Service.extend({
    listFunc: A(),
    /**
     * 商务逻辑注入到Service
     * @param {Object} func 
     */
    funcInjection(func) {
        let name = func.name;
        assert(`List of the same key, KeyName => ${name}`, !this.get('listFunc').any(obj => obj.name === name));
        this.get('listFunc').pushObject({ name, reference: func });
    },
    getFuncInstance(funcName, ...arg) {
        let reVal = this.get('listFunc').find(obj => obj.name === funcName)
        assert(`Function is not find，Please review => ${funcName}`, reVal);
        if (reVal) {
            reVal.reference.call(this, ...arg);
        }
        return null
    }
})