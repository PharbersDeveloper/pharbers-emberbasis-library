import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
	name: DS.attr('string'),
	// auth: DS.belongsTo('auth', { async: false }),
	people: DS.hasMany('pepole', { async: false })
});
