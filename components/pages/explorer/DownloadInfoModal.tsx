import { css } from '@emotion/react';
import React from 'react';
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
          <a href="./acknoledgements">acknowledge</a> the Canadian Public Health Laboratory Network
          (CPHLN), CanCOGeN VirusSeq, all laboratories having contributed data and follow all{' '}
          <a href="./policies">CVDP policies</a>.
        </p>
        <p>
          Data that is being shared is the work of many individuals and should be treated as
          unpublished data. If you wish to publish research using the data, contact us at
          <a href="mailto:info@virusseq-dataportal.ca">info@virusseq-dataportal.ca</a> first to
          ensure that those who have generated the data can be involved in its analysis.
        </p>
      </p>
    </Modal>
  );
};

export default DownloadInfoModal;
