import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import defaultTheme from '../../theme';
import Guidelines from './Guidelines';
import Privacy from './Privacy';
import Usage from './Usage';

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
          margin: 30px 0;
          max-width: 870px;
          padding: 40px;
          width: 100%;
          ${theme.shadow.default};

          .bold {
            font-weight: bold;
          }

          h1 {
            color: ${theme.colors.primary};
            font-size: 26px;
            font-weight: normal;
            margin: 0;
          }

          h2 {
            ${theme.typography.subheading};
          }

          ol,
          ul {
            padding-left: 30px;

            li {
              &:not(:last-of-type) {
                margin-bottom: 5px;
              }

              ol,
              ul {
                margin-top: 5px;
              }
            }
          }

          section:not(:first-of-type) {
            margin-top: 40px;
          }
        `}
      >
        <Usage />
        <Privacy />
        <Guidelines />
      </article>
    </main>
  );
};

export default PageContent;
