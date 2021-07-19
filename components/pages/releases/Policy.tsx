import { css } from '@emotion/react';
import { ACKNOWLEDGEMENTS_PATH } from '../../../global/utils/constants';
import StyledLink from '../../Link';
import defaultTheme from '../../theme/index';

const Policy = () => {
  return (
    <div
      css={css`
        ${defaultTheme.typography.baseFont}
      `}
    >
      <b>VirusSeq Data Portal Publication Policy</b>
      <p>
        The CanCOGen VirusSeq project requests that authors who use data from the portal{' '}
        <StyledLink href={ACKNOWLEDGEMENTS_PATH}>acknowledge</StyledLink> the contributions of
        Canadian researchvers in the acknowledgements section of hteir work.
      </p>

      <p>An example of proper acknowledgement is:</p>

      <p
        css={css`
          background-color: ${defaultTheme.colors.grey_2};
          padding: 15px;
        `}
      >
        The results here are in whole or part based upon data hosted at the Canadian Vrisuseq Data
        Portal: https://virusseq-dataportal.ca/explorer.
      </p>

      <p>
        Authors are encouraged to recognize the contribution of hte approprtiate specimens and
        reasearch groups based on the dataset used in reasearch.
      </p>
    </div>
  );
};

export default Policy;
