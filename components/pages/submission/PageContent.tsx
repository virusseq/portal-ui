import { css } from '@emotion/core';

import { getConfig } from '../../../global/config';
import { StyledLinkAsButton } from '../../Link';

const PageContent = () => {
  const {
    NEXT_PUBLIC_EGO_API_ROOT,
    NEXT_PUBLIC_EGO_CLIENT_ID,
  } = getConfig();

  return (
    <main
      css={(theme) => css`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100vw;
      `}
    >
      <article
        css={theme => css`
          background-color: ${theme.colors.white};
          border-radius: 5px;
          max-width: 600px;
          padding: 30px;
          width: 100%;
          ${theme.shadow.default};
        `}
      >
        <h1
          css={theme => css`
            color: ${theme.colors.primary};
            margin: 0 0 20px;
          `}
        >
          Data Submission
        </h1>
        <p
          css={theme => css`
            font-weight: bold;
          `}
        >
          CoViD-19 Data is submitted to this portal by approved users.
          </p>
        <ul
          css={theme => css`
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            margin: 0;
            padding: 0;
            width: 100%;

            li {
              box-sizing: border-box;
              display: flex;
              flex-basis: 50%;
              flex-direction: column;
              justify-content: space-between;
              padding: 10px 0;

              &:first-of-type {
                padding-right: 30px;
              }

              &:not(:first-of-type) {
                border-left: 1px solid ${theme.colors.grey_4};
                padding-left: 30px;
              }  
            }

            p {
              margin: 0 0 20px;
              font-size: 0.8em;
            }
          `}
        >
          <li>
            <p>To be granted a data submission account for your organization, please contact Genome Canada with an account request.</p>
            <StyledLinkAsButton
              css={(theme) => css`
                ${theme.typography.button};
                background-color: ${theme.colors.primary_dark};
                border-color: ${theme.colors.primary_dark};
                line-height: 20px;
                padding: 8px 20px;
                width: fit-content;
              `}
              href="https://www.genomecanada.ca/en/cancogen"
              rel="noopener noreferrer"
              target="_blank"
            >
              Request an Account
            </StyledLinkAsButton>
          </li>
          <li>
            <p>If you already have an authorized account, please log in to submit your data.</p>
            <StyledLinkAsButton
              css={(theme) => css`
                ${theme.typography.button};
                background-color: ${theme.colors.primary_dark};
                border-color: ${theme.colors.primary_dark};
                line-height: 20px;
                padding: 8px 20px;
                width: fit-content;
              `}
              href={`${NEXT_PUBLIC_EGO_API_ROOT}/oauth/login/keycloak?client_id=${NEXT_PUBLIC_EGO_CLIENT_ID}`}
            >
              Log in to Submit Data
            </StyledLinkAsButton>
          </li>
        </ul>
      </article>

      {/*token ? 'yuss' : 'Big nope'*/}
    </main>
  );
};

export default PageContent;
