import DS from 'ember-data';

export default DS.Model.extend({
	token: DS.attr('string'),
	Profile: DS.belongsTo('PhProfile', { async: false })
});
