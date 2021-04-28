import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import defaultTheme from '../../theme';
import Funding from './Funding';
import Parners from './Partners';
import Portal from './Portal';
import Cloud from './Cloud';

const PageContent = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();

  return (
    <main
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        padding-bottom: ${theme.dimensions.footer.height}px;
      `}
    >
      <article
        css={css`
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          margin: 30px 0;
          max-width: 800px;
          padding: 40px;
          width: 100%;
          ${theme.shadow.default};
        `}
      >
        <h1
          css={css`
            color: ${theme.colors.primary};
            font-size: 26px;
            font-weight: normal;
            margin: 0;
          `}
        >
          About the Team
        </h1>

        <p
          css={css`
            font-style: italic;
            margin-top: 10px 0 0;
          `}
        >
          A Made-in-Canada Data Solution
        </p>

        <Funding />
        <Parners />
        <Portal />
        <Cloud />
      </article>
    </main>
  );
};

export default PageContent;
