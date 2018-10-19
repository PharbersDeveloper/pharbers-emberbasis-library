import DS from 'ember-data'; 

export default DS.JSONAPISerializer.extend({
    primaryKey: 'id',
	keyForAttribute(key) {
		return key;
	},
	keyForRelationship(key) {
		return key;
	},
	payloadKeyFromModelName(modelName) {
		return modelName
	},
	modelNameFromPayloadKey(modelName) {
		return modelName
	},
    normalizeResponse(store, model, payload, id, requestType) {
        switch(requestType) {
            case 'queryObject':
                return this.normalizeQueryRecordResponse(...arguments);
            case 'queryMultipleObject':
                return this.normalizeQueryResponse(...arguments);
            case 'transaction':
                return this.normalizeQueryRecordResponse(...arguments);
            default:
                return this._super(...arguments);
        }
    }
})
