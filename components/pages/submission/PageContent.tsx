import { css } from '@emotion/core';

import { getConfig } from '../../../global/config';
import NewSubmissions from './NewSubmissions';

const PageContent = () => {
  const {
    NEXT_PUBLIC_EGO_API_ROOT,
    NEXT_PUBLIC_EGO_CLIENT_ID,
  } = getConfig();

  return (
    <main
      css={(theme) => css`
        display: flex;
        padding-top: 40px;
        position: relative;
        
        > * {
          flex-basis: 50%;
          padding: 0 30px;
        }
      `}
    >
      <NewSubmissions />
    </main>
  );
};

export default PageContent;
