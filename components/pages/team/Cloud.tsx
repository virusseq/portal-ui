import { css } from '@emotion/core';
import OvertureLogoWithText from '../../theme/icons/overture_logo_with_text'

const Cloud = () => (
    <section
        css={(theme) => css`
        margin: 50px 50px;


        @media (min-width: 900px) {
        max-width: calc(100% - 75px);
        margin-right: 25px;
        }

        @media (min-width: 960px) {
        max-width: calc(100% - 75px);
        }
    `}>
        <div css={(theme) => css`
        display: flex;
    `}>
            <span
                css={(theme) => css`
            flex-grow: 3
        `}
            >
                <span css={css`
                    font-weight: bold;
                `}>Cloud Based Platform: </span>
                 Genome Canada has partnered with <a href="www.dnastack.com">DNAstack</a> to integrate COVID Cloud with the
                 Canadian VirusSeq Data Portal. COVID Cloud is a cloud-based platform that
                 helps researchers find, visualize, and analyze genomics and other datasets
                 related to COVID-19. COVID  Cloud is sharing Canadian and international
                 data over APIs developed by the <a href="www.ga4gh.org">Global Alliance for Genomics & Health</a> and
                 provides tools for researchers to search, visualize, and analyze data in the cloud.
                 COVID Cloud is developed by
                 a <a href="https://www.digitalsupercluster.ca/covid-19-program-page/beacon-realtime-global-data-sharing-network/">consortium of Canadian partners</a> and
                 funded by Canada’s <a href="https://www.digitalsupercluster.ca/">Digital Technology Supercluster.</a>
            </span>

            <span css={(theme) => css`
            width: 187px;
            height: 151px;
            margin: -25px 0 25px 29px;
            padding: 17px 27px 0px 28px;
            border-radius: 10px;
            border: solid 1px #dfdfe1;
            background-color: var(--white);
        `}>
                <a
                    href="https://virusseq.covidcloud.ca/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img src="images/covid-cloud-black.png"
                        alt="Covid Cloud Logo"
                        css={css`
                        width: 136px;
                        height: 16px;
                        margin: 16px -4px 28px;
                        object-fit: contain;
                     `} />
                </a>
                <a
                    href="www.dnastack.com"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img src="images/dnastack-logo-typeface.png"
                        alt="Dnastack company logo"
                        css={css`
                        height: 35px;
                        margin: 28px -4px 0;
                        object-fit: contain;
                     `} />
                </a>
            </span>
        </div>

    </section>
);

export default Cloud;
