/**
 * 本方法将数据序列化成Ember Data想要的标准格式 也就是JSONAPI 不要用这个了
 */

export function query(serializer, modelClass, payload) {
	return serializer.normalize(modelClass, payload);
}
