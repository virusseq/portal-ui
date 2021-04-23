import { css } from '@emotion/core';
import {
    GenomeCanadaLogo,
    OvertureLogoWithText,
} from '../../theme/icons';

const Funding = () => (
    <section
        css={(theme) => css`
      margin: 0 50px;


      @media (min-width: 900px) {
        max-width: calc(100% - 75px);
        margin-right: 25px;
      }

      @media (min-width: 960px) {
        max-width: calc(100% - 75px);
      }
    `}
    >
        <h2
            css={(theme) => css`
            color: #191919;
            font-size: 16px;
            font-weight: bold;
            position: relative;
        `}
        >
            Funding and Data Curation
        </h2>

        <div css={(theme) => css`
        display: flex;
    `}>
            <span
                css={(theme) => css`
            flex-grow: 3
        `}
            >
                <a href="www.genomecanada.ca">Genome Canada</a>, in partnership with the <a href="www.canada.ca">Government of Canada</a>, leads the
            development of the Canadian VirusSeq Data Portal that manages and facilitates
            data sharing of SARS-CoV-2 genome sequences among Canadian public health labs,
            researchers and other groups interested in accessing the data for research
            and innovation purposes.
        </span>

            <span css={(theme) => css`
            width: 187px;
            height: 151px;
            margin: -47px 0 25px 29px;
            padding: 17px 27px 0px 28px;
            border-radius: 10px;
            border: solid 1px #dfdfe1;
            background-color: var(--white);
        `}>
                <a
                    href="https://www.genomecanada.ca/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <GenomeCanadaLogo width={123} height={74} style={css`
                    margin: 0 5px 26px 4px;
                    object-fit: contain;
                `} />
                </a>
                <a href="https://www.genomecanada.ca/en/cancogen"
                    rel="noopener noreferrer"
                    target="_blank" >
                    <img src="images/can-co-gen-colour-1.png"
                        alt="image representing the three steps of DNA sequencing"
                        css={css`
                        width: 132px;
                        height: 18px;
                        margin: 0 0 -10;
                        object-fit: contain;
                     `} />
                </a>
            </span>
        </div>

        <div>
            <p>
                The rapid funding opportunity was announced on February 12, 2021 by the Public Health Agency of Canada (PHAC)
            for the Genome Canada-led <a href="https://www.genomecanada.ca/en/cancogen">Canadian COVID Genomics Network (CanCOGeN)</a> to directly support
            <a href="https://www.canada.ca/en/public-health/news/2021/02/government-of-canada-invests-53-million-to-address-covid-19-virus-variants-of-concern.html">Canada’s Variants of Concern Strategy</a>.
            CanCOGeN’s <a href="https://www.genomecanada.ca/en/cancogen/cancogen-virusseq">VirusSeq initiative</a> is working with PHAC’s National Microbiology Laboratory, Health Canada,
            the Canadian Institutes of Health Research, as well as other provincial and territorial partners to support the strategy.
            Together, these partners have quickly scaled up genomic sequencing, surveillance and research efforts to detect new variants,
            increase real-time data sharing capacity, and inform appropriate public health and policy responses.
        </p>
            <p>
                Genome Canada acts as a data custodian with overall responsibility for and oversight of the data within the Canadian
                VirusSeq Data Portal. Innovative data solutions and partnerships like this one harness the power of genomics to develop
                tools that help Canada contain this pandemic more quickly and be better prepared for future public health challenges.
        </p>
        </div>

    </section>
);

export default Funding;

