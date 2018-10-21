import DS from 'ember-data';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { DEBUG } from '@glimmer/env';

const typeForRelationshipMeta = function(meta) {
    let modelName;

    modelName = meta.type || meta.key;
    if (meta.kind === 'hasMany') {
        modelName = dasherize(modelName);
    }
    return modelName;
}

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
    /**
     * overwrite extractRelationships并做了hacker的步骤，改变EmberData对`type`名字约束，为什么这样做，是因为Ember本身没有暴露这样的接口，后续你们掌握Ember后，可以帮我找找
     * @param {Model Class Object} modelClass 
     * @param {Object} resourceHash 
     */
    extractRelationships(modelClass, resourceHash) {
        let relationships = {};
        modelClass.relatedTypes = typeForRelationshipMeta(resourceHash)
        if (resourceHash.relationships) {
            modelClass.eachRelationship((key, relationshipMeta) => {
                relationshipMeta.type = typeForRelationshipMeta(resourceHash)
                let relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, 'deserialize');
                if (resourceHash.relationships[relationshipKey] !== undefined) {

                    let relationshipHash = resourceHash.relationships[relationshipKey];
                    relationships[key] = this.extractRelationship(relationshipHash);

                }
                if (DEBUG) {
                    if (resourceHash.relationships[relationshipKey] === undefined && resourceHash.relationships[key] !== undefined) {
                        assert(`Your payload for '${modelClass.modelName}' contains '${key}', but your serializer is setup to look for '${relationshipKey}'. This is most likely because Ember Data's JSON API serializer dasherizes relationship keys by default. You should subclass JSONAPISerializer and implement 'keyForRelationship(key) { return key; }' to prevent Ember Data from customizing your relationship keys.`, false);
                    }
                }
            });
        }
        return relationships;
    },
    normalizeResponse(store, model, payload, id, requestType) {
        switch (requestType) {
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
