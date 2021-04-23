import { ReactElement } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import StyledLink from '../../Link';
import defaultTheme from '../../theme';
import { GenomeCanadaLogo } from '../../theme/icons';

const Funding = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();

  return (
    <section>
      <div
        css={css`
          display: flex;
        `}
      >
        <span>
          <h2
            css={css`
              ${theme.typography.subheading};
            `}
          >
            Funding and Data Curation
          </h2>

          <p>
            <StyledLink
              href="https://www.genomecanada.ca"
              rel="noopener noreferrer"
              target="_blank"
            >
              Genome Canada
            </StyledLink>
            , in partnership with the{' '}
            <StyledLink href="https://www.canada.ca" rel="noopener noreferrer" target="_blank">
              Government of Canada
            </StyledLink>
            , leads the development of the Canadian VirusSeq Data Portal that manages and
            facilitates data sharing of SARS-CoV-2 genome sequences among Canadian public health
            labs, researchers and other groups interested in accessing the data for research and
            innovation purposes.
          </p>
        </span>

        <span
          css={css`
            border: solid 1px #dfdfe1;
            border-radius: 10px;
            box-sizing: border-box;
            margin: 5px 0 0 35px;
            padding: 15px 15px 15px 20px;
            width: 190px;
          `}
        >
          <StyledLink href="https://www.genomecanada.ca/" rel="noopener noreferrer" target="_blank">
            <GenomeCanadaLogo
              width={125}
              height={75}
              style={css`
                margin-bottom: 20px;
                /* margin: 0 5px 26px 4px; */
                /* object-fit: contain; */
              `}
            />
          </StyledLink>
          <StyledLink
            href="https://www.genomecanada.ca/en/cancogen"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src="images/cancogen-logo.png"
              alt="image representing the three steps of DNA sequencing"
              css={css`
                width: 130px;
              `}
            />
          </StyledLink>
        </span>
      </div>

      <p>
        The rapid funding opportunity was announced on February 12, 2021 by the Public Health Agency
        of Canada (PHAC) for the Genome Canada-led{' '}
        <StyledLink
          href="https://www.genomecanada.ca/en/cancogen"
          rel="noopener noreferrer"
          target="_blank"
        >
          Canadian COVID Genomics Network (CanCOGeN)
        </StyledLink>
        {' to directly support '}
        <StyledLink
          href="https://www.canada.ca/en/public-health/news/2021/02/government-of-canada-invests-53-million-to-address-covid-19-virus-variants-of-concern.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          Canada’s Variants of Concern Strategy
        </StyledLink>
        . CanCOGeN’s{' '}
        <StyledLink
          href="https://www.genomecanada.ca/en/cancogen/cancogen-virusseq"
          rel="noopener noreferrer"
          target="_blank"
        >
          VirusSeq initiative
        </StyledLink>{' '}
        is working with PHAC’s National Microbiology Laboratory, Health Canada, the Canadian
        Institutes of Health Research, as well as other provincial and territorial partners to
        support the strategy. Together, these partners have quickly scaled up genomic sequencing,
        surveillance and research efforts to detect new variants, increase real-time data sharing
        capacity, and inform appropriate public health and policy responses.
      </p>
      <p>
        Genome Canada acts as a data custodian with overall responsibility for and oversight of the
        data within the Canadian VirusSeq Data Portal. Innovative data solutions and partnerships
        like this one harness the power of genomics to develop tools that help Canada contain this
        pandemic more quickly and be better prepared for future public health challenges.
      </p>
    </section>
  );
};
export default Funding;
