import { css } from '@emotion/core';

const WhySequence = () => (
  <section
    css={(theme) => css`
      margin: 0 50px;

      > * {
        margin: 25px 0;
      }

      @media (min-width: 900px) {
        max-width: calc(65% - 75px);
        margin-left: 25px;
      }

      @media (min-width: 960px) {
        max-width: calc(60% - 75px);
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
      Why Sequence this Virus?
    </h2>

    <figure
      css={(theme) => css`
        display: flex;
        flex-wrap: wrap;
        max-width: 744px;

        figcaption {
          ${theme.typography.label};
          flex-basis: calc(33% - 20px);
          padding: 10px;
          text-align: center;
        }
      `}
    >
      <img src="images/about-why_sequence.png" alt="image representing the three steps of DNA sequencing" width="100%" style={{ maxHeight: "200px"}} />
      <figcaption
        css={(theme) => css`
        `}
      >
        Identify and track transmission trends at the regional, provincial, national and international scales.
      </figcaption
      >
      <figcaption
        css={(theme) => css`
        `}
      >
        Aid detection of new clusters of cases/outbreaks.
      </figcaption>
      <figcaption
        css={(theme) => css`
        `}
      >
        Discover evolving viral characteristics that might impact.
      </figcaption>
    </figure>
  </section>
);

export default WhySequence;
