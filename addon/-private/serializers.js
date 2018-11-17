/**
 * 本方法主要工作是寻找对应的Adapter的序列化方法的工具类（看名字也知道）
 */
export function serializerForAdapter(store, adapter, modelName) {
	let serializer = adapter.serializer;

	if (typeof serializer === 'undefined') {
		serializer = store.serializerFor(modelName);
	}

	if (serializer === null || typeof serializer === 'undefined') {
		serializer = {
			extract(estores, type, payload) {
				return payload;
			}
		};
	}
	return serializer;
}
