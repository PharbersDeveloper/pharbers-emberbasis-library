import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	demo_controller: service(),
	init() {
		this._super(...arguments);
	},
	actions: {

	}
});
