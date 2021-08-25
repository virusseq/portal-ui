import { css } from '@emotion/react';
import React from 'react';
import { Archive } from '../../../../global/hooks/useSingularityData/types';
import { ACKNOWLEDGEMENTS_PATH } from '../../../../global/utils/constants';
import StyledLink from '../../../Link';
import Loader from '../../../Loader';
import { Modal } from '../../../Modal';
import defaultTheme from '../../../theme';
import { Checkmark, CoronaVirus, File } from '../../../theme/icons';
import Error from '../../../theme/icons/error';

type Props = { onClose: () => void; archive?: Archive };
const CompleteCheckmark = () => (
  <div
    css={css`
      display: flex;
      align-items: center;
      padding: 8px;
      background-color: ${defaultTheme.colors.success_dark};
      border-radius: 50%;
    `}
  >
    <Checkmark size={17} fill={defaultTheme.colors.white} />
  </div>
);

const ArchiveStatDisplay = ({
  numOfSamples = 0,
  id = '',
}: {
  numOfSamples?: number;
  id?: string;
}) => {
  return (
    <div
      css={css`
        display: flex;
        margin-top: 20px;
        align-items: center;
        border: solid 1px ${defaultTheme.colors.grey_3};
        padding: 15px 20px 15px 20px;
        column-gap: 40px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 10px;
        `}
      >
        <CoronaVirus />
        <span>{numOfSamples} Viral Genomes</span>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 10px;
        `}
      >
        <File />
        <span> ID: {id}</span>
      </div>
    </div>
  );
};

const DownloadInfoModal = ({ onClose, archive }: Props) => {
  const showDownloading = !archive || archive?.status === 'BUILDING';

  const DownloadTitle = (
    <div
      css={css`
        display: flex;
        align-items: center;
        column-gap: 10px;
        margin-left: 10px;
        margin-top: 10px;
        color: ${defaultTheme.colors.primary};
        ${defaultTheme.typography.heading}
      `}
    >
      {showDownloading && (
        <>
          <Loader size={'20px'} margin={'0px'} /> <span>Downloading...</span>
        </>
      )}
      {archive?.status === 'COMPLETE' && (
        <>
          <CompleteCheckmark /> <span>Download Complete</span>
        </>
      )}
      {archive?.status === 'FAILED' && (
        <>
          <Error /> <span>Download Failed</span>
        </>
      )}
    </div>
  );

  return (
    <Modal onCloseClick={onClose} title={DownloadTitle}>
      <div
        css={css`
          width: 700px;
          margin: 0px;
          ${defaultTheme.typography.regular}
        `}
      >
        {!archive ? (
          <Loader size={'25px'} />
        ) : (
          <ArchiveStatDisplay numOfSamples={archive?.numOfSamples} id={archive?.id} />
        )}
        <p
          css={css`
            margin-top: 25px;
          `}
        >
          Your download has started. By downloading this data, you agree to{' '}
          <StyledLink href={ACKNOWLEDGEMENTS_PATH}>acknowledge</StyledLink> the Canadian Public
          Health Laboratory Network (CPHLN), CanCOGeN VirusSeq, all laboratories having contributed
          data and follow all <StyledLink href="./policies">CVDP policies</StyledLink>.
        </p>
        <p>
          Data that is being shared is the work of many individuals and should be treated as
          unpublished data. If you wish to publish research using the data, contact us at{' '}
          <StyledLink
            href="mailto:info@virusseq-dataportal.ca"
            rel="noopener noreferrer"
            target="_blank"
          >
            info@virusseq-dataportal.ca
          </StyledLink>{' '}
          first to ensure that those who have generated the data can be involved in its analysis.
        </p>
      </div>
    </Modal>
  );
};

export default DownloadInfoModal;
