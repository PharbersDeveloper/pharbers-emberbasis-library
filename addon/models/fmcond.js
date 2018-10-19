import DS from 'ember-data';

export default DS.Model.extend({
    skip: DS.attr('number'),
    take: DS.attr('number')
});
