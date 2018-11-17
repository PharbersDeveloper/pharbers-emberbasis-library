import PharbersSerializer from 'pharbers-emberbasis-library/serializers/phserializer';
import { classify } from '@ember/string';

/**
 * 所有的Serializer都要继承phserializer
 * 数据有特殊需求直接在normalizeResponse自己修改
 * @type {String}
 */

export default PharbersSerializer.extend({
	payloadKeyFromModelName(modelName) {
		return classify(modelName);
	},
});
