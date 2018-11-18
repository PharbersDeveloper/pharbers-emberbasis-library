import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
	name: DS.attr('string'),
	// people: DS.hasMany('pepole', { async: false })
});
