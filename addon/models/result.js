import DS from 'ember-data';

export default DS.Model.extend({
    target: DS.attr('string'),
    content: DS.attr('string')
});
