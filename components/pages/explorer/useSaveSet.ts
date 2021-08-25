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

const useSaveSet = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveSet = (sqon: object): Promise<string> => {
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
          return setId;
        },
      )
      .catch((err: any) => {
        setIsLoading(false);
        console.warn(err);
        Promise.reject(err);
      }) as Promise<string>;
  };

  return { saveSet, isLoading };
};

export default useSaveSet;
