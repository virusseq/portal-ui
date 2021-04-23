import { ReactElement } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import StyledLink from '../../Link';
import defaultTheme from '../../theme';
import { ChevronDown } from '../../theme/icons';

const CovidCloudPane = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();

  return (
    <article
      css={css`
        align-items: center;
        background-color: ${theme.colors.grey_2};
        border: 1px solid ${theme.colors.grey_3};
        border-radius: 5px;
        box-sizing: border-box;
        color: ${theme.colors.accent_dark};
        display: flex;
        flex-direction: column;
        margin: 50px;
        padding: 30px;
        text-align: center;
        width: calc(100% - 100px);
      `}
    >
      <img src="/images/covid-cloud.png" alt="logo for Covid Cloud" width="180" />
      <p
        css={css`
          margin: 20px 0;
          max-width: 900px;
        `}
      >
        Genome Canada has partnered with{' '}
        <StyledLink href="https://www.dnastack.com" rel="noopener noreferrer" target="_blank">
          DNAstack
        </StyledLink>{' '}
        to integrate COVID Cloud with the Canadian VirusSeq Data Portal. COVID Cloud is a
        cloud-based platform that helps researchers find, visualize, and analyze genomics and other
        datasets related to COVID-19.
      </p>
      <a
        css={css`
          align-items: center;
          color: ${theme.colors.primary};
          display: flex;
          font-weight: bold;
          text-decoration: none;
        `}
        href="https://virusseq.covidcloud.ca/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Explore VirusSeq Data on COVID Cloud
        <ChevronDown
          fill={theme.colors.primary}
          height={11}
          width={10}
          style={css`
            margin-left: 3px;
            transform: rotate(-90deg);
          `}
        />
      </a>
    </article>
  );
};

export default CovidCloudPane;
