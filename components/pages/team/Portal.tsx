import { css } from '@emotion/core';
import OvertureLogoWithText from '../../theme/icons/overture_logo_with_text'
import OicrLogo from '../../theme/icons/oicr';

const Portal = () => (
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
                `}>VirusSeq Data Portal: </span>
                The VirusSeq Data Portal was designed and developed
                by the <a href="https://softeng.oicr.on.ca/team/">Genome Informatics Team</a> at 
                the <a href="www.oicr.on.ca">Ontario Institute for Cancer Research</a>,
                led by Dr. Christina Yung, Director of Genome Informatics and Dr. Lincoln Stein,
                Head of Adaptive Oncology. The software is powered by <a href="www.overture.bio">Overture</a>, an open-source
                software suite for managing and sharing data at scale on compute clouds.
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
                    href="https://overture.bio/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <OvertureLogoWithText width={123} height={74} style={css`
                    margin: -12px 0px 0px 4px;
                    object-fit: contain;
                `} />
                </a>
                <a
                    href="https://oicr.on.ca"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                <OicrLogo style={css`
                    width: 113px;
                    height: 81px;
                    margin: -16px 0px 0;
                    object-fit: contain;
                `} />
                </a>
            </span>
        </div>

    </section>
);

export default Portal;
