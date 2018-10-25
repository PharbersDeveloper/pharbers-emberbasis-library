import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    age: DS.attr('number'),
    comments: DS.hasMany('comment', { async: false })
    // comments: DS.belongsTo('comment', { async: false })
});
