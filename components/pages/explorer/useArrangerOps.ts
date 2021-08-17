import { useState } from 'react';
import createArrangerFetcher from '../../utils/arrangerFetcher';

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

const useArrangerOps = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const saveSet = (sqon: object) => {
    setIsLoading(true);
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
          setIsLoading(false);
          return setId as String;
        },
      )
      .catch((err: any) => {
        setIsLoading(false);
        console.warn(err);
        Promise.reject(err);
      });
  };

  return { saveSet, isLoading };
};

export default useArrangerOps;
