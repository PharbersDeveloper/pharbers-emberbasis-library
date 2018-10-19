import DS from 'ember-data';

export default DS.Model.extend({
    res: DS.attr('string'),
    eqcond: DS.hasMany('eqcond', { async: false }),
    necond: DS.hasMany('necond', { async: false }),
    gtcond: DS.hasMany('gtcond', { async: false }),
    ltcond: DS.hasMany('ltcond', { async: false }),
    gtecond: DS.hasMany('gtecond', { async: false }),
    ltecond: DS.hasMany('ltecond', { async: false }),
    upcond: DS.hasMany('upcond', { async: false }),
    fmcond: DS.belongsTo('fmcond', { async: false }),
});
