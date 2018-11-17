/**
 * 本方法将数据序列化成规范的JSON-API ID有没有都要传
 * 返回处理后的数据Ember直接绑定
 * 注意看命名应该知道这是个后端数据转前端用的一个工具类
 */
export function normalizeResponseHelper(serializer, store, modelClass, payload, id, requestType) {
	let normalizedResponse = serializer.normalizeResponse(store, modelClass, payload, id, requestType);

	return normalizedResponse;
}
