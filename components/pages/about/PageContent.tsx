import { css } from '@emotion/core';

import HeroBanner from './HeroBanner';
import Impact from './Impact';
import WhySequence from './WhySequence';

const PageContent = () => {
  return (
    <main
      css={(theme) => css`
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 100vw;
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
    </main>
  );
};

export default PageContent;
