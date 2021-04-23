import { ReactElement } from 'react';
import { css } from '@emotion/core';

import StyledLink from '../../Link';
import OvertureLogoWithText from '../../theme/icons/overture_logo_with_text';
import OicrLogo from '../../theme/icons/oicr';

const Portal = (): ReactElement => (
  <section>
    <div
      css={css`
        display: flex;
      `}
    >
      <p>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          VirusSeq Data Portal:{' '}
        </span>
        The VirusSeq Data Portal was designed and developed by the{' '}
        <StyledLink
          href="https://softeng.oicr.on.ca/team/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Genome Informatics Team
        </StyledLink>{' '}
        at the{' '}
        <StyledLink href="https://www.oicr.on.ca">Ontario Institute for Cancer Research</StyledLink>
        , led by Dr. Christina Yung, Director of Genome Informatics and Dr. Lincoln Stein, Head of
        Adaptive Oncology. The software is powered by{' '}
        <StyledLink href="https://www.overture.bio" rel="noopener noreferrer" target="_blank">
          Overture
        </StyledLink>
        , an open-source software suite for managing and sharing data at scale on compute clouds.
      </p>

      <span
        css={css`
          width: 190px;
          margin: 0px 0 0 35px;
          padding: 25px 20px;
          border-radius: 10px;
          border: solid 1px #dfdfe1;
        `}
      >
        <StyledLink href="https://overture.bio/" rel="noopener noreferrer" target="_blank">
          <OvertureLogoWithText
            width={123}
            style={css`
              margin: -12px 0px 0px 4px;
              object-fit: contain;
            `}
          />
        </StyledLink>
        <StyledLink href="https://oicr.on.ca" rel="noopener noreferrer" target="_blank">
          <OicrLogo
            style={css`
              margin: 10px 0 0 10px;
            `}
          />
        </StyledLink>
      </span>
    </div>
  </section>
);

export default Portal;
