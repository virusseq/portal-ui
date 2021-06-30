import { css } from '@emotion/react';
import { ACKNOWLEDGEMENTS_PATH } from '../../../global/utils/constants';
import StyledLink, { InternalLink } from '../../Link';
import { Modal } from '../../Modal';
import defaultTheme from '../../theme';

const DownloadInfoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onCloseClick={onClose} title={'Download'}>
      <p
        css={css`
          width: 700px;
          margin: 0px;
          ${defaultTheme.typography.regular}
        `}
      >
        <p>
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
      </p>
    </Modal>
  );
};

export default DownloadInfoModal;
