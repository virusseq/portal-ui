import { ReactElement } from 'react';
import { css } from '@emotion/react';

import ErrorNotification from '../ErrorNotification';

const NoScopes = (): ReactElement => (
  <ErrorNotification
    size="md"
    title="Invalid Permissions"
    styles={`
      align-items: center;
      box-sizing: border-box;
      flex-direction: column;
      font-size: 14px;
      justify-content: center;
      max-width: 100%;
      width: 100%;

      p {
        margin-top: 5px;
      }
    `}
  >
    <p>
      {'You are not authorized to submit data into the Canadian VirusSeq Data Portal. '}
      {'In order to obtain the correct permissions, please contact '}
      <a href="mailto:info@virusseq-dataportal.ca">info@virusseq-dataportal.ca</a>
      {' with the following information. Permission should be granted within 2 business days.'}
    </p>
    <ol
      css={css`
        font-weight: 600;
        margin: 10px 0 0;
        padding-left: 0;
      `}
    >
      <li>The name of your institution.</li>
      <li>The name of the lead investigator for your study.</li>
      <li>The study ID (if known).</li>
      <li>The email address you used to log in to the VirusSeq Data Portal.</li>
    </ol>
  </ErrorNotification>
);

export default NoScopes;
