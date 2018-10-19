import { get } from '@ember/object';
// import Ember from 'ember';
/**
 * 这个应该是监测属性的生命周期的，具体没调试，不知道 先可以这么假设，然后在求证
 */

// var heimdalljs = require("heimdalljs")
// const heimdall = new Heimdall();
// const heimdall = require('babel6-plugin-strip-heimdall')

// const {
//   __bind,
//   __guard,
//   __objectIsAlive
// } = heimdall.registerMonitor('modules.Common.common',
//   '_bind',
//   '_guard',
//   '_objectIsAlive'
// );

export function _bind(fn, ...args) {
	// heimdall.increment(__bind);

	return function() {
		return fn.apply(undefined, args);
	};
}

export function _guard(promise, test) {
	// heimdall.increment(__guard);
	try {
		let guarded = promise['finally'](function() {
			if (!test()) {
				guarded._subscribers.length = 0;
			}
		});

		return guarded;
	} catch (e) {
		return promise;
	}

	// let guarded = promise['finally'](function() {
	//   if (!test()) {
	//     guarded._subscribers.length = 0;
	//   }
	// });
	//
	// return guarded;
}

export function _objectIsAlive(object) {
	// heimdall.increment(__objectIsAlive);
	return !(get(object, "isDestroyed") || get(object, "isDestroying"));
}
