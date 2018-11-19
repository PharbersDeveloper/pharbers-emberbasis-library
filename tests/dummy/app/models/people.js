import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
	regions: DS.hasMany('region', { async: false })
    // post: DS.belongsTo('post', { async: false })
});
