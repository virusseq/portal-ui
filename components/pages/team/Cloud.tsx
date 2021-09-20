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
import { css } from '@emotion/react';

import StyledLink from '../../Link';

const Cloud = (): ReactElement => (
  <section>
    <div
      css={css`
        align-items: center;
        display: flex;
      `}
    >
      <p>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          Cloud Based Platform:{' '}
        </span>
        Genome Canada has also partnered with{' '}
        <StyledLink href="https://www.dnastack.com" rel="noopener noreferrer" target="_blank">
          DNAstack
        </StyledLink>{' '}
        to integrate VirusSeq data with their COVID Cloud Platform. COVID Cloud is a cloud-based
        platform that helps researchers find, visualize, and analyze genomics and other datasets
        related to COVID-19. COVID Cloud is sharing Canadian and international data over APIs
        developed by the{' '}
        <StyledLink href="https://www.ga4gh.org" rel="noopener noreferrer" target="_blank">
          Global Alliance for Genomics & Health
        </StyledLink>{' '}
        and provides tools for researchers to search, visualize, and analyze data in the cloud.
        COVID Cloud is developed by a{' '}
        <StyledLink
          href="https://www.digitalsupercluster.ca/covid-19-program-page/beacon-realtime-global-data-sharing-network/"
          rel="noopener noreferrer"
          target="_blank"
        >
          consortium of Canadian partners
        </StyledLink>{' '}
        and funded by Canada’s{' '}
        <StyledLink
          href="https://www.digitalsupercluster.ca/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Digital Technology Supercluster.
        </StyledLink>
      </p>

      <span
        css={css`
          border: solid 1px #dfdfe1;
          border-radius: 10px;
          box-sizing: border-box;
          margin: 15px 0 0 35px;
          padding: 20px;
          width: 190px;
        `}
      >
        <StyledLink
          href="https://virusseq.covidcloud.ca/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="images/covid-cloud.png"
            alt="Covid Cloud Logo"
            css={css`
              margin: 10px 0 20px;
              width: 128px;
            `}
          />
        </StyledLink>
        <StyledLink href="https://www.dnastack.com" rel="noopener noreferrer" target="_blank">
          <img
            src="images/dnastack-logo-typeface.png"
            alt="Dnastack company logo"
            css={css`
              height: 35px;
            `}
          />
        </StyledLink>
      </span>
    </div>
  </section>
);

export default Cloud;
