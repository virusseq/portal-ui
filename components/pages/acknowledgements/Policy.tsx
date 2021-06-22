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

import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import StyledLink from '../../Link';
import defaultTheme from '../../theme';

const Partners = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  return (
    <section
      css={css`
        margin: 5px 0 10px;
      `}
    >
      <h2
        css={css`
          ${theme.typography.subheading};
        `}
      >
        Policy on recognition of the work of data providers
      </h2>

      <p>
        You may use the data from the Canadian VirusSeq Data Portal to author results obtained from
        your analyses of relevant data, provided that your published results acknowledge the
        Canadian Public Health Laboratory Network (CPHLN), CanCOGeN VirusSeq and all laboratories
        having contributed data. We suggest using the following acknowledgement sentence: <strong>"The
        results here are in whole or part based upon data hosted at the Canadian VirusSeq Data
        Portal: <StyledLink
          href="https://virusseq-dataportal.ca/"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://virusseq-dataportal.ca/
        </StyledLink>. We wish to acknowledge the following
        organisations/laboratories for contributing data to the Portal: Canadian Public Health
        Laboratory Network (CPHLN), CanCOGGeN VirusSeq and (insert complete list of labs available
        at <StyledLink
          href="https://virusseq-dataportal.ca/acknowledgements"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://virusseq-dataportal.ca/acknowledgements
        </StyledLink>)"</strong>. You can redistribute the data
        available on the Canadian VirusSeq Data Portal under the same terms and conditions as
        specified in this policy. You should not impose any additional or different terms or
        conditions on, or apply any effective technological measures to, the data, if doing so
        restricts the use of the data by others.
      </p>

      <p>
        Please note that the data that is being shared is the work of many individuals and should be
        treated as unpublished data. If you wish to publish research using the data, contact us at <StyledLink
          href="mailto:info@virusseq-dataportal.ca"
          rel="noopener noreferrer"
          target="_blank"
        >
          info@virusseq-dataportal.ca
        </StyledLink> first to ensure that those who have generated the data can be
        involved in its analysis. You are responsible to make the best efforts to collaborate with
        representatives of the data providers responsible for obtaining the specimen(s) and involve
        them in such analyses and further research using such data. The metadata available on the
        Canadian VirusSeq Data Portal comprises only a small fraction of the rich Canadian COVID-19
        related datasets that you can have access to through more formal collaboration with CPHLN
        and CanCOGeN VirusSeq members.
      </p>
    </section>
  );
};

export default Partners;
