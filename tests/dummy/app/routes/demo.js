import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default Route.extend({
	demo_route: service(),
	demo_controller: service(),
	setupController(controller, model) {
		this._super(controller, model);
		// this.controllerFor('application')
	},
	model() {
		// 你的逻辑
		let req = this.get('demo_controller').createModel('request', {
			id: '1',
			res: 'bind_course_region_rep',
			fmcond: this.get('demo_controller').createModel('fmcond', {
				id: '1',
				skip: 0,
				take: 1000
			}),
			eqcond: A([
				this.get('demo_controller').createModel('eqcond', {
					id: '1',
					key: 'region_id',
					val: 'a',
				}),
				this.get('demo_controller').createModel('eqcond', {
					id: '2',
					key: 'course_id',
					val: 12,
				})]
			)
		});

		let conditions = this.get('demo_route').object2JsonApi(req);
		this.get('logger').log(conditions)

		return this.get('demo_route').queryMultipleObject('api/v1/login/0', 'auth', {});
	},
	actions: {
		// 你的动作
		delete() {
			// let auth = this.get('demo_controller').queryModelByID('auth', '5b7e454a8fb8076c3c3304l0');
			this.get('demo_controller').removeModelByID('auth', '5b7e454a8fb8076c3c3304l0');
		},
		gotopre() {
			this.transitionTo('application')
		}
	}
});
