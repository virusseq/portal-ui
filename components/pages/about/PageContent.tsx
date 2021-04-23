import { css } from '@emotion/core';
import { ReactElement } from 'react';

import CovidCloudPane from './CovidCloudPane';
import HeroBanner from './HeroBanner';
import Impact from './Impact';
import WhySequence from './WhySequence';

const PageContent = (): ReactElement => {
  return (
    <main
      css={(theme) => css`
        align-items: center;
        display: flex;
        flex-direction: column;
        padding-bottom: ${theme.dimensions.footer.height}px;
      `}
    >
      <HeroBanner />

      <article
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin-top: 30px;
          max-width: 1680px;
          width: 100%;

          @media (min-width: 900px) {
          }
        `}
      >
        <Impact />
        <WhySequence />
      </article>

      <CovidCloudPane />
    </main>
  );
};

export default PageContent;
