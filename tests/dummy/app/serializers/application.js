import PharbersSerializer from 'pharbers-emberbasis-library/serializers/phserializer';
import { dasherize } from '@ember/string';
import { pluralize, singularize } from 'ember-inflector';
import { assert, deprecate, warn } from '@ember/debug';
import { isEnabled } from 'ember-data/-private';

/**
 * 所有的Serializer都要继承phserializer
 * 数据有特殊需求直接在normalizeResponse自己修改
 * @type {String}
 */
export default PharbersSerializer.extend({
    primaryKey: 'id',
    keyForAttribute(key) {
        return key
    },
    keyForRelationship(key) {
        return key
    },
    payloadKeyFromModelName(modelName) {
        window.console.info(singularize(modelName))
        return modelName
    },
    modelNameFromPayloadKey(modelName) {
        return dasherize(modelName);
    }
});
