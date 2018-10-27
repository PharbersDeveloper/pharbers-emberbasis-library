import DS from 'ember-data';
import { dasherize } from '@ember/string';
import { assert, deprecate } from '@ember/debug';
import { DEBUG } from '@glimmer/env';
import { get } from '@ember/object';
// import Ember from 'ember';
import { isEnabled } from '@ember/canary-features'

// export function isEnabled() {
//     return Ember.FEATURES.isEnabled(...arguments);
// }

const typeForRelationshipMeta = function (meta) {
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
    },
    serializeBelongsTo(snapshot, json, relationship) {
        let key = relationship.key;

        if (this._canSerialize(key)) {
            let belongsTo = snapshot.belongsTo(key);
            if (belongsTo !== undefined) {

                json.relationships = json.relationships || {};

                let payloadKey = this._getMappedKey(key, snapshot.type);
                if (payloadKey === key) {
                    payloadKey = this.keyForRelationship(key, 'belongsTo', 'serialize');
                }

                let data = null;
                if (belongsTo) {
                    let payloadType;

                    if (isEnabled("ds-payload-type-hooks")) {
                        payloadType = this.payloadTypeFromModelName(belongsTo.modelName);
                        let deprecatedPayloadTypeLookup = this.payloadKeyFromModelName(belongsTo.modelName);

                        if (payloadType !== deprecatedPayloadTypeLookup && this._hasCustomPayloadKeyFromModelName()) {
                            deprecate("You used payloadKeyFromModelName to serialize type for belongs-to relationship. Use payloadTypeFromModelName instead.", false, {
                                id: 'ds.json-api-serializer.deprecated-payload-type-for-belongs-to',
                                until: '3.0.0'
                            });

                            payloadType = deprecatedPayloadTypeLookup;
                        }
                    } else {
                        payloadType = this.payloadKeyFromModelName(belongsTo.modelName);
                    }

                    data = {
                        type: payloadType,
                        id: belongsTo.id
                    };
                }
                json.relationships[payloadKey] = { data };
                json.included = [
                    {
                        id: belongsTo.id,
                        type: this.payloadKeyFromModelName(belongsTo.modelName),
                        attributes: belongsTo._attributes
                    }
                ]
            }
        }
    },
    serializeHasMany(snapshot, json, relationship) {
        let key = relationship.key;
        // let shouldSerializeHasMany = '_shouldSerializeHasMany';
        // if (isEnabled("ds-check-should-serialize-relationships")) {
        //     shouldSerializeHasMany = 'shouldSerializeHasMany';
        // }

        // if (this[shouldSerializeHasMany](snapshot, key, relationship)) {

        // }
        let hasMany = snapshot.hasMany(key);
        if (hasMany !== undefined) {
            json.relationships = json.relationships || {};

            let payloadKey = this._getMappedKey(key, snapshot.type);
            if (payloadKey === key && this.keyForRelationship) {
                payloadKey = this.keyForRelationship(key, 'hasMany', 'serialize');
            }

            let data = new Array(hasMany.length);

            for (let i = 0; i < hasMany.length; i++) {
                let item = hasMany[i];

                let payloadType;

                if (isEnabled("ds-payload-type-hooks")) {
                    payloadType = this.payloadTypeFromModelName(item.modelName);
                    let deprecatedPayloadTypeLookup = this.payloadKeyFromModelName(item.modelName);

                    if (payloadType !== deprecatedPayloadTypeLookup && this._hasCustomPayloadKeyFromModelName()) {
                        deprecate("You used payloadKeyFromModelName to serialize type for belongs-to relationship. Use payloadTypeFromModelName instead.", false, {
                            id: 'ds.json-api-serializer.deprecated-payload-type-for-has-many',
                            until: '3.0.0'
                        });

                        payloadType = deprecatedPayloadTypeLookup;
                    }
                } else {
                    payloadType = this.payloadKeyFromModelName(item.modelName);
                }

                data[i] = {
                    type: payloadType,
                    id: item.id
                };
            }
            json.relationships[payloadKey] = { data };
            let included = hasMany.map(data => {
                return {
                    id: data.id,
                    type: this.payloadKeyFromModelName(data.modelName),
                    attributes: data._attributes
                }
            })
            json.included = included
        }
    },
    serialize(snapshot, options) {
        this._super(...arguments);
        let json = {};
        if (options && options.includeId) {
            const id = snapshot.id;
            if (id) {
                json[get(this, 'primaryKey')] = id;
            }
        }
        json.type = this.payloadKeyFromModelName(snapshot.modelName),
            snapshot.eachAttribute((key, attribute) => {
                this.serializeAttribute(snapshot, json, key, attribute);
            });

        snapshot.eachRelationship((key, relationship) => {
            if (relationship.kind === 'belongsTo') {
                this.serializeBelongsTo(snapshot, json, relationship);
            } else if (relationship.kind === 'hasMany') {
                this.serializeHasMany(snapshot, json, relationship);
            }
        });
        return json;
    }
})
