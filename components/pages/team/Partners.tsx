import { css } from '@emotion/core';

const Partners = () => (
  <section
    css={(theme) => css`
        margin: 0 50px;

        > * {
            margin: 25px 0;
          }

        @media (min-width: 900px) {
        max-width: calc(100% - 75px);
        margin-right: 25px;
        }

        @media (min-width: 960px) {
        max-width: calc(100% - 75px);
        }
   `}>

    <h2
      css={(theme) => css`
        color: #191919;
        font-size: 16px;
        font-weight: bold;
        position: relative;
      `}
    >
      Technology Partners
    </h2>

    <p>
      The development and implementation of the Canadian VirusSeq Data Portal is led
      by <a href="https://www.computationalgenomics.ca/c3g-montreal-node/">Dr. Guillaume Bourque (McGill University) and his team</a>.
      This team, in collaboration with CanCOGeN and world-leading genomics scientists specializing in data science and policy,
      including Drs. Fiona Brinkman (Simon Fraser University), William Hsiao (Simon Fraser University),
      Lincoln Stein and Christina Yung (Ontario Institute for Cancer Research) and Yann Joly (McGill University),
      oversees the technical interactions with the National Microbiology Laboratory and provincial public
      health labs across the country.
    </p>

  </section>
);

export default Partners;
