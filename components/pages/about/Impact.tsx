import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import { StyledLinkAsButton } from '../../Link';
import defaultTheme from '../../theme';

const Impact = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  return (
    <section
      css={css`
        margin: 0 50px;

        > * {
          margin: 25px 0;
        }

        @media (min-width: 900px) {
          max-width: calc(35% - 75px);
          margin-right: 25px;
        }

        @media (min-width: 960px) {
          max-width: calc(40% - 75px);
        }
      `}
    >
      <h2
        css={css`
          color: ${theme.colors.primary};
          font-size: 26px;
          font-weight: normal;
          position: relative;
        `}
      >
        Impact on Canadians
      </h2>

      <p>
        Genomic-based tracking and analysis of the evolving traits of the SARS-CoV-2 virus across
        Canada provides critical information for:
      </p>

      <ul>
        <li>Public health and policy decisions</li>
        <li>Testing and tracing strategies</li>
        <li>Virus detection and surveillance methods</li>
        <li>Vaccine development and effectiveness</li>
        <li>Drug discovery and effectiveness of treatment</li>
        <li>Understanding susceptibility, disease severity and clinical outcomes</li>
      </ul>

      <StyledLinkAsButton
        css={css`
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
        Learn more about CanCOGeN
      </StyledLinkAsButton>
    </section>
  );
};

export default Impact;
