import DS from 'ember-data'; 
import { dasherize } from '@ember/string';

export default DS.JSONAPISerializer.extend({
    primaryKey: 'id',
	keyForAttribute(key) {
		return key
	},
	keyForRelationship(key) {
		return key
	},
	payloadKeyFromModelName(modelName) {
		return modelName
	},
	modelNameFromPayloadKey(modelName) {
		return dasherize(modelName);
    },
    normalizeResponse(store, model, payload, id, requestType) {
        switch(requestType) {
            case 'queryObject':
                return this.normalizeQueryRecordResponse(store, model, payload, id, requestType);
            case 'queryMultipleObject':
                return this.normalizeQueryResponse(store, model, payload, id, requestType);
            case 'transaction':
                return this.normalizeQueryRecordResponse(store, model, payload, id, requestType);
            default:
                return this._super(store, model, payload, id, requestType);
        }
    }
})
