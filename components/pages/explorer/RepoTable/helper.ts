import { SQONType } from '@overture-stack/arranger-components/dist/DataContext/types';
import SQON from '@overture-stack/sqon-builder';
import { isEmpty } from 'lodash';

import createArrangerFetcher from '@/components/utils/arrangerFetcher';

const arrangerFetcher = createArrangerFetcher({});

const saveSetMutation = `mutation ($sqon: JSON!)  {
	saveSet(
		sqon: $sqon,
		type: file,
		path: "name"
	) {
		setId
	}
}`;

export const saveSet = (sqon: SQONType): Promise<string> => {
	return arrangerFetcher({
		body: {
			query: saveSetMutation,
			variables: { sqon },
		},
	})
		.then(
			({
				data: {
					saveSet: { setId },
				},
			}) => {
				return setId;
			},
		)
		.catch((err: any) => {
			console.warn(err);
			Promise.reject(err);
		}) as Promise<string>;
};

export function buildSqonWithObjectIds(currentSqon: SQONType, objectIds: string[]): SQONType {
	const objectsSqon = objectIds && objectIds.length > 0 ? SQON.in('object_id', objectIds) : null;

	if (!isEmpty(currentSqon) && !isEmpty(objectsSqon)) {
		return currentSqon.and(objectsSqon);
	}

	if (isEmpty(currentSqon) && !isEmpty(objectsSqon)) {
		return objectsSqon;
	}

	if (!isEmpty(currentSqon) && isEmpty(objectsSqon)) {
		return currentSqon;
	}

	return null;
}
