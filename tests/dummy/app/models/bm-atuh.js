import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    person: DS.belongsTo('bm-person', { async: false })
});
