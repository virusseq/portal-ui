import StyledLink from '../../Link';

const Policy = () => {
  return (
    <div>
      <b>VirusSeq Data Portal Publication Policy</b>
      <p>
        The CanCOGen VirusSeq project requests that authors who use data from the portal{' '}
        <StyledLink>acknowledge</StyledLink> the contributions of Canadian researchvers in the
        acknowledgements section of hteir work.
      </p>

      <p>An example of proper acknowledgement is:</p>

      <p>
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
