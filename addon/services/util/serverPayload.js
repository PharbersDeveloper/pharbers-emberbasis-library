/* eslint-disable no-underscore-dangle */
import { isArray } from '@ember/array';

export function setDataRelationships(model, json/*, existData*/) {
	model.eachRelationship((key, descriptor) => {
		let relationships = json['relationships'] = {}, relationshipKey = relationships[key] = {};

		if (descriptor.kind === 'hasMany') {
			let data = relationshipKey['data'] = [];

			model.get(key).toArray().forEach(result => {
				// let payloadType = '', isExits = 0;

				// payloadType = result.store.serializerFor(result._internalModel.modelName).payloadKeyFromModelName(result._internalModel.modelName);
				// isExits = existData.filter(elem => elem.id === result.get('id') && elem.type === payloadType).length;


				data.push({
					id: result.get('id'),
					type: descriptor.type
				});
				// if (isExits === 0) {
				// 	data.push({
				// 		id: result.get('id'),
				// 		type: descriptor.type
				// 	});
				// } else {
				// 	delete relationships[key];
				// }
			});
		} else {
			// let payloadType = '', isExits = 0;
			// debugger
			// payloadType = model.store.serializerFor(model.get(key)._internalModel.modelName).payloadKeyFromModelName(model.get(key)._internalModel.modelName);
			// isExits = existData.filter(elem => elem.id === model.get('id') && elem.type === payloadType).length;

			relationshipKey['data'] = {
				id: model.get('id'),
				type: descriptor.type
			};
			// if (isExits === 0) {
			// 	relationshipKey['data'] = {
			// 		id: model.get('id'),
			// 		type: descriptor.type
			// 	};
			// } else {
			// 	delete relationships[key];
			// }
		}
	});
}

export function serverIncludedSerialize(model, json, existData) {
	model.eachRelationship((key, descriptor) => {
		if (descriptor.kind === 'hasMany') {
			model.get(key).toArray().forEach(result => {
				let m = {}/*, isExits = 0*/;

				m['id'] = result.get('id');
				m['type'] = result.store.serializerFor(result._internalModel.modelName).payloadKeyFromModelName(result._internalModel.modelName);//result.serialize({ includeId: true }).type;

				// isExits = existData.filter(elem => elem.id === m.id && elem.type === m.type).length;

				// if (isExits === 0) {
				// 	result.eachAttribute(name => {
				// 		let attributes = m['attributes'] = {};

				// 		attributes[name] = result.data[name];
				// 	});

				// 	json.push(m);

				// 	existData.push({id: m.id, type: m.type});

				// 	setDataRelationships(result, m, existData);
				// 	serverIncludedSerialize(result, json, existData);
				// }
				result.eachAttribute(name => {
					let attributes = m['attributes'] = {};

					attributes[name] = result.data[name];
				});

				json.push(m);

				existData.push({id: m.id, type: m.type});

				setDataRelationships(result, m, existData);
				serverIncludedSerialize(result, json, existData);
			});
		} else {
			let m = {}, isExits = 0;

			m['id'] = model.get(key).get('id');
			m['type'] = model.get(key).store.serializerFor(model.get(key)._internalModel.modelName).payloadKeyFromModelName(model.get(key)._internalModel.modelName);//model.get(key).serialize({ includeId: true }).type;

			isExits = existData.filter(elem => elem.id === m.id && elem.type === m.type).length;

			if (isExits === 0) {
				model.get(key).eachAttribute(name => {
					let attributes = m['attributes'] = {};

					attributes[name] = model.get(key).data[name];
				});

				json.push(m);

				existData.push({id: m.id, type: m.type});

				setDataRelationships(model.get(key), m, existData);
				serverIncludedSerialize(model.get(key), json, existData);
			}
		}
	});
}

export function serverDataSerialize(model, json) {
	let existData = [];

	if (isArray(model)) {
		model.forEach(single => {
			let m = {};

			m['id'] = single.get('id');
			m['type'] = single.store.serializerFor(single._internalModel.modelName).payloadKeyFromModelName(single._internalModel.modelName);//single.serialize({ includeId: true }).type;

			single.eachAttribute(name => {
				let attributes = m['attributes'] = {};

				attributes[name] = single.data[name];
			});
			json.data.push(m);

			existData.push({id: m.id, type: m.type});

			setDataRelationships(single, m, existData);
			serverIncludedSerialize(single, json.included, existData);
		});
	} else {
		let m = {};

		m['id'] = model.get('id');
		m['type'] = model.store.serializerFor(model._internalModel.modelName).payloadKeyFromModelName(model._internalModel.modelName);//model.serialize({ includeId: true }).type;

		model.eachAttribute(name => {
			let attributes = m['attributes'] = {};

			attributes[name] = model.data[name];
		});

		json.data = m;

		existData.push({id: m.id, type: m.type});

		setDataRelationships(model, m, existData);
		serverIncludedSerialize(model, json.included, existData);
	}
}

export function serverModelSerialize(model, json) {
	serverDataSerialize(model, json);
}
