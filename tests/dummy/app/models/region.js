import DS from 'ember-data';

export default DS.Model.extend({
    province: DS.belongsTo('provinces', { async: false }),
    // users: DS.belongsTo('users', { async: false })
});
