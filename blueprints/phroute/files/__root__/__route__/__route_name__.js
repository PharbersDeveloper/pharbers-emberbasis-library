import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
	setupController(controller, model) {
		this._super(controller, model);
		// this.controllerFor('application')
	},
	model() {

	},
	actions: {

	}
});
