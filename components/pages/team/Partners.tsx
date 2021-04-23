import { ReactElement } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import StyledLink from '../../Link';
import defaultTheme from '../../theme';

const Partners = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  return (
    <section
      css={css`
        margin: 5px 0 10px;
      `}
    >
      <h2
        css={css`
          ${theme.typography.subheading};
        `}
      >
        Technology Partners
      </h2>

      <p>
        The development and implementation of the Canadian VirusSeq Data Portal is led by{' '}
        <StyledLink
          href="https://www.computationalgenomics.ca/c3g-montreal-node/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Dr. Guillaume Bourque (McGill University) and his team
        </StyledLink>
        . This team, in collaboration with CanCOGeN and world-leading genomics scientists
        specializing in data science and policy, including Drs. Fiona Brinkman (Simon Fraser
        University), William Hsiao (Simon Fraser University), Lincoln Stein and Christina Yung
        (Ontario Institute for Cancer Research) and Yann Joly (McGill University), oversees the
        technical interactions with the National Microbiology Laboratory and provincial public
        health labs across the country.
      </p>
    </section>
  );
};
export default Partners;
