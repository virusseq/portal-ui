import { css } from '@emotion/core';

import ReleaseData from './ReleaseData';
import { StyledLinkAsButton, InternalLink as Link } from '../../Link';
import { MapleLeaf } from '../../theme/icons';
import { EXPLORER_PATH } from '../../../global/utils/constants';

/** Layout notes:
  - Article is the full-width background for the hero banner
  - Section centers the content in larger screens
 ** */

const HeroBanner = () => (
  <article
    css={(theme) => css`
      background-color: ${theme.colors.primary_dark};
      box-sizing: border-box;
      color: ${theme.colors.white};
      display: flex;
      padding: 45px 50px;
      width: 100%;

      @media (min-width: 1270px) {
        background-image: url(/images/about-hero.png);
        background-repeat: no-repeat;
        background-size: 589px;
        height: 460px;
        padding-left: 630px;
      }

      @media (min-width: 2165px) {
        padding-left: 50px;
        justify-content: center;
      }

      @media (min-width: 2170px) {
      }

      @media (min-width: 2880px) {
        padding-left: 50px;
      }
    `}
  >
    <section
      css={(theme) => css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 1550px;
        width:100%;

        > * {
          margin: 0;

          &:not(h1) {
            margin-top: 20px;
          }
        }
      `}
    >
      <h1
        css={(theme) => css`
          font-size: 30px;
          font-weight: normal;
          position: relative;

          @media (min-width: 1345px) {
            font-size: 34px;
          }
        `}
      >
        <MapleLeaf
          style={css`
            left: -42px;
            position: absolute;
          `}
        />
        Canadian VirusSeq Data Portal
      </h1>
      <p
        css={(theme) => css`
          ${theme.typography.subheading}
        `}
        >
        The goal of VirusSeq is to perform SARS-CoV-2 genomics surveillance by sequencing up to 150,000 viral genomes from individuals testing positive for COVID-19, and ensuring data access to the research community.
      </p>
      <ReleaseData />
      <Link path={EXPLORER_PATH}>
        <StyledLinkAsButton
          css={(theme) => css`
            ${theme.typography.button};
            background-color: ${theme.colors.accent3};
            border-color: ${theme.colors.accent3};
            line-height: 20px;
            padding: 8px 20px;
            width: fit-content;

            &:hover {
              color: ${theme.colors.white};
              background-color: ${theme.colors.accent3_dark};
            }
          `}
        >
          Explore the Data
        </StyledLinkAsButton>
      </Link>
    </section>
  </article>
);

export default HeroBanner;
