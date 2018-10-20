import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
    token: DS.attr('string'),
    'mult_data': DS.hasMany('multdata', { async: false })
});
