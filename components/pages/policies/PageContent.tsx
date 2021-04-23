import { css } from '@emotion/core';
import { ReactElement } from 'react';
import { useTheme } from 'emotion-theming';

import defaultTheme from '../../theme';
import StyledLink from '../../Link';

const PageContent = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();

  return (
    <main
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        padding-bottom: ${theme.dimensions.footer.height}px;
      `}
    >
      <article
        css={css`
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          margin: 30px 0;
          max-width: 870px;
          padding: 40px;
          width: 100%;
          ${theme.shadow.default};

          @media (min-width: 900px) {
          }
        `}
      >
        <h1
          css={css`
            color: ${theme.colors.primary};
            font-size: 26px;
            font-weight: normal;
            margin: 0;
          `}
        >
          Website and Data Usage Policies
        </h1>

        <section>
          <h2
            css={css`
              ${theme.typography.subheading};
            `}
          >
            General
          </h2>
          <p>
            The Canadian VirusSeq Data Portal promotes data sharing that provides the research
            community access and use to the data and analysis according to{' '}
            <StyledLink
              href="https://www.go-fair.org/fair-principles/"
              rel="noopener noreferrer"
              target="_blank"
            >
              FAIR data principles
            </StyledLink>
            .
          </p>
          <p>
            The Canadian VirusSeq Data Portal is not providing access to any personal data at the
            current time. If you are submitting sequences or metadata to the Canadian VirusSeq Data
            Portal, do not include any data that could reveal the personal identity of the source.
          </p>
        </section>

        <section>
          <h2
            css={css`
              ${theme.typography.subheading};
            `}
          >
            Disclaimer
          </h2>
          <p>
            COVID-19 is an emerging, rapidly evolving situation. To promote responsive,
            collaborative, research and public health surveillance, virus sequences and minimal
            metadata are released on the Canadian VirusSeq Data Portal rapidly and should be
            considered draft and subject to change.
          </p>
          <p>
            Beyond limited editorial control and some internal integrity checks, the quality and
            accuracy of the record are the responsibility of the submitting author, not of the data
            portal. It is also the responsibility of the submitters to ascertain that they have the
            right to submit the data. The VirusSeq team will work with the submitters to provide
            feedback on metadata and sequence data to improve the overall quality and consistency of
            the data submitted.
          </p>
        </section>

        <section>
          <h2
            css={css`
              ${theme.typography.subheading};
            `}
          >
            Recognition of the work of the data producer
          </h2>
          <p>
            You may use the data from the Canadian VirusSeq Data Portal to author results obtained
            from your analyses of relevant data, provided that your published results acknowledge,
            as the original source of the data, CPLHN, CanCOGeN-VirusSeq, the laboratory where the
            clinical specimen(s) and/or virus isolate(s) were first obtained and if applicable, the
            laboratory where the data have been generated from the isolate(s) and/or specimen(s)
            received and submitted to the Canadian VirusSeq Data Portal. Laboratories should be
            identified by geographic location and address.
          </p>
          <p>
            Please note that the data that is being shared is the work of many individuals and
            should be treated as unpublished data. If you wish to publish research using the data,
            <StyledLink
              href="https://www.genomecanada.ca/en/about/contact-us"
              rel="noopener noreferrer"
              target="_blank"
            >
              contact us
            </StyledLink>{' '}
            first to ensure that those who have generated the data can be involved in its analysis.
            You are responsible to make best efforts to collaborate with representatives of the
            Originating Laboratory responsible for obtaining the specimen(s) and involve them in
            such analyses and further research using such Data.
          </p>
        </section>

        <section>
          <h2
            css={css`
              ${theme.typography.subheading};
            `}
          >
            Intellectual Property
          </h2>
          <p>
            The Canadian VirusSeq Data Portal is designed to provide and encourage access within the
            scientific community to the most up-to-date and comprehensive COVID virus sequence
            information. Therefore, there are no restrictions on the use or distribution of the
            Canadian VirusSeq Data Portal data. While we do not encourage this practice, some
            submitters may claim patent, copyright, or other intellectual property rights in all or
            a portion of the data they have submitted. The Canadian VirusSeq data portal is not in a
            position to assess the validity of such claims, and therefore cannot provide comment or
            unrestricted permission concerning the use, copying, or distribution of the information
            it contains. Source NCBI modified.
          </p>
        </section>
      </article>
    </main>
  );
};

export default PageContent;
