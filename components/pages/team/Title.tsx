import { css } from '@emotion/core';

const Title = () => (
  <section
    css={(theme) => css`
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
      css={(theme) => css`
        color: ${theme.colors.primary};
        font-size: 26px;
        font-weight: normal;
        position: relative;
      `}
    >
      About the Team
    </h2>

    <p
      css={(theme) => css`
        font-style: italic;
      `}
    >
      A Made-in-Canada Data Solution
    </p>
  </section>
);

export default Title;
