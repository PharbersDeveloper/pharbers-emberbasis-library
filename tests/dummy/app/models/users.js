import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    region: DS.belongsTo('region', { async: false })
});
