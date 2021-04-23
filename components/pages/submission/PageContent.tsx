import { ReactElement } from 'react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { useTheme } from 'emotion-theming';

import defaultTheme from '../../theme';
import NewSubmissions from './NewSubmissions';
import PreviousSubmissions from './PreviousSubmissions';
import SubmissionDetails from './SubmissionDetails';

type QueryType = {
  query: {
    ID?: string[];
  };
};
const PageContent = (): ReactElement => {
  const {
    query: { ID: [submissionID] = [] },
  }: QueryType = useRouter();
  const theme: typeof defaultTheme = useTheme();

  return (
    <main
      css={css`
        display: flex;
        padding: 40px 0 calc(${theme.dimensions.footer.height}px + 30px);
        position: relative;

        > * {
          ${!submissionID && 'flex-basis: 50%;'}
          padding: 0 30px;
        }

        .view-title {
          color: ${theme.colors.primary};
          font-weight: normal;
          margin: 0 0 40px;
        }
      `}
    >
      {submissionID ? (
        <SubmissionDetails ID={submissionID} />
      ) : (
        <>
          <PreviousSubmissions />
          <NewSubmissions />
        </>
      )}
    </main>
  );
};

export default PageContent;
