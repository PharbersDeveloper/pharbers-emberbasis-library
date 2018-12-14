import DS from 'ember-data';

export default DS.Model.extend({
	username: DS.attr('string'),
	Company: DS.belongsTo('PhCompany', { async: false })
});
