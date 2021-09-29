/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

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
        Canadian researchvers in the acknowledgements section of hteir work. Authors are encouraged
        to recognize the contributions of the appropriate specimens and research groups based on the
        datasets used in their research.
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
