import { EXPLORER_PATH } from '../../../global/utils/constants';
import StyledLink from '../../Link';

const Description = () => {
  return (
    <div>
      The VirusSeq Data Portal regularly releases submitted data. Each release bundles contains 2
      files: <b>TSV file containing all submitted metadata</b> as of that relase data.time, as well
      as a <b>FASTA file containg all the coreesponding sequences</b>. The lastes release is
      availble in the <StyledLink href={EXPLORER_PATH}>data explorer</StyledLink>
    </div>
  );
};

export default Description;
