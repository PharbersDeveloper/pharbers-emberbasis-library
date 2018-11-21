import Service from '@ember/service';
import injectFunctionEmberObject from 'pharbers-emberbasis-library/-private/injection-function/inject-function';

export default Service.extend({
	injectFunc(funcReference) {
		injectFunctionEmberObject.funcInjection(funcReference);
	},
	getInjectFuncInstance(funcName, ...arg) {
		injectFunctionEmberObject.getFuncInstance(this, funcName, ...arg);
	}
});
