import { isEmpty } from 'lodash';
import createArrangerFetcher from '../../../utils/arrangerFetcher';

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

export const saveSet = (sqon: object): Promise<string> => {
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

export function buildSqonWithObjectIds(currentSqon: Record<string, unknown>, objectIds: string[]) {
  const objectsSqon =
    objectIds && objectIds.length > 0
      ? { op: 'in', content: { field: 'object_id', value: objectIds } }
      : {};

  if (!isEmpty(currentSqon) && !isEmpty(objectsSqon)) {
    return {
      op: 'and',
      content: [currentSqon, objectsSqon],
    };
  }

  if (isEmpty(currentSqon) && !isEmpty(objectsSqon)) {
    return objectsSqon;
  }

  if (!isEmpty(currentSqon) && isEmpty(objectsSqon)) {
    return currentSqon;
  }

  return {};
}
