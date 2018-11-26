/* eslint-disable no-underscore-dangle */
import { isArray } from '@ember/array';

export function recursiveResetChangeRelationshipModelAttr(execInstance, model, filterModelAndIdList) {
	model.eachRelationship((key, descriptor) => {
		if (descriptor.kind === 'hasMany') {
			model.get(key).toArray().forEach(result => {
				let type = result.store.serializerFor(result._internalModel.modelName).payloadKeyFromModelName(result._internalModel.modelName), id = result.get('id'), isExits = 0;

				execInstance.resetChangedModelAttr(result);

				isExits = filterModelAndIdList.filter(elem => elem.id === id && elem.type === type).length;

				if (isExits === 0) {
					filterModelAndIdList.push({id, type});
					recursiveResetChangeRelationshipModelAttr(execInstance, result, filterModelAndIdList);
				}
			});
		} else {
			let type = model.store.serializerFor(model._internalModel.modelName).payloadKeyFromModelName(model._internalModel.modelName), id = model.get('id'), isExits = 0;

			isExits = filterModelAndIdList.filter(elem => elem.id === id && elem.type === type).length;
			execInstance.resetChangedModelAttr(model);

			if (isExits === 0) {
				filterModelAndIdList.push({id, type});
				recursiveResetChangeRelationshipModelAttr(execInstance, model, filterModelAndIdList);
			}
		}
	});
}

export function resrtChangedModelAttr(execInstance, model) {
	let filterModelAndIdList = [];

	if (isArray(model)) {
		// recursiveResrtChangedModelAttr(execInstance, model);
		model.forEach(single => {
			let type = single.store.serializerFor(single._internalModel.modelName).payloadKeyFromModelName(single._internalModel.modelName), id = single.get('id');

			filterModelAndIdList.push({id, type});
			recursiveResetChangeRelationshipModelAttr(execInstance, model, filterModelAndIdList);
		});
	} else {
		let type = model.store.serializerFor(model._internalModel.modelName).payloadKeyFromModelName(model._internalModel.modelName), id = model.get('id');

		filterModelAndIdList.push({id, type});
		execInstance.resetChangedModelAttr(model);
		recursiveResetChangeRelationshipModelAttr(execInstance, model, filterModelAndIdList);
	}
}
