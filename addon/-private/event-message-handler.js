import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { assert } from '@ember/debug';

export function isexist(attrs, name) {
    return A(Object.keys(attrs)).any(o => o === name)
}

export function _lookUpComponent(instance, actionName, arg) {
    const componet = instance;
    const parentView = componet.parentView;
    if (isexist(componet.attrs, actionName)) {
        componet.attrs[actionName].call(this, ...arg)
        return;
    } else if (parentView) {
        _lookUpComponent(parentView, actionName, arg)
        // const parentViewAttrs = parentView.attrs;
        // if (isexist(parentViewAttrs, actionName)) {
        //     parentViewAttrs[actionName].call(this, ...arg)
        // } else {
        //     _lookUpComponent(parentView, actionName, arg)
        // }
        // assert(`not find ${actionName}`, isexist(instance.attrs, actionName));
    }
}

export default EmberObject.extend({
    upAction(instance, actionName, ...arg) {
        _lookUpComponent(instance, actionName, arg)
    }
})