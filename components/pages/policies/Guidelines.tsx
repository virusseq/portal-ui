import { ReactElement } from 'react';

import StyledLink from '../../Link';

const Usage = (): ReactElement => (
  <section>
    <h1>Data Submitters Guidelines</h1>

    <h2>Registration</h2>

    <p>
      Individuals and organizations interested in submitting data to the CVDP must first apply for
      data submission authorization through{' '}
      <StyledLink
        href="mailto:info@virusseq-dataportal.ca"
        rel="noopener noreferrer"
        target="_blank"
      >
        info@virusseq-dataportal.ca
      </StyledLink>
      . Registration can be completed with an email of choice. Afterwards, a verification email will
      be sent to the user. Once authorized, users can upload data via an account provided to them.
      Through this account, users can review the status of submission and review or reattempt any
      failed submissions. More detailed instructions for data submission can be found
      post-registration.
    </p>

    <p>
      With registration, the CVDP will collect the user’s email address used, first and last name,
      user name, and password. Please refer to the CVDP Privacy Policy for more details on how the
      collection, storage, and processing of any user data.
    </p>

    <h2>Sensitive or Identifiable Data</h2>

    <p>
      Submitters are responsible for not submitting any sensitive or personal information to the
      CVDP. “Dehosting” and other relevant risk mitigation procedures are recommended to minimize
      the risk of submitting any sensitive or identifiable data.
    </p>

    <h2>Helpdesk</h2>

    <p>
      The CVDP operates a helpdesk based on a ticketing system. You may contact the helpdesk at{' '}
      <StyledLink
        href="mailto:info@virusseq-dataportal.ca"
        rel="noopener noreferrer"
        target="_blank"
      >
        info@virusseq-dataportal.ca
      </StyledLink>
      .
    </p>
  </section>
);

export default Usage;
