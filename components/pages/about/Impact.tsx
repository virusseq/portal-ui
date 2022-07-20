/*
 *
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { StyledLinkAsButton } from '../../Link';
import defaultTheme from '../../theme';

const Impact = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  return (
    <section
      css={css`
        margin: 0 50px;

        > * {
          margin: 25px 0;
        }

        @media (min-width: 900px) {
          max-width: calc(35% - 75px);
          margin-right: 25px;
        }

        @media (min-width: 960px) {
          max-width: calc(40% - 75px);
        }
      `}
    >
      <h2
        css={css`
          color: ${theme.colors.primary};
          font-size: 26px;
          font-weight: normal;
          position: relative;
        `}
      >
        Impact on Canadians
      </h2>

      <p>
        Genomic-based tracking and analysis of the evolving traits of the SARS-CoV-2 virus across
        Canada provides critical information for:
      </p>

      <ul>
        <li>Public health and policy decisions</li>
        <li>Testing and tracing strategies</li>
        <li>Virus detection and surveillance methods</li>
        <li>Vaccine development and effectiveness</li>
        <li>Drug discovery and effectiveness of treatment</li>
        <li>Understanding susceptibility, disease severity and clinical outcomes</li>
      </ul>

      <StyledLinkAsButton
        css={css`
          ${theme.typography.button};
          background-color: ${theme.colors.primary_dark};
          border-color: ${theme.colors.primary_dark};
          line-height: 20px;
          padding: 8px 20px;
          width: fit-content;
        `}
        href="https://www.genomecanada.ca/en/cancogen"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn more about CanCOGeN
      </StyledLinkAsButton>
    </section>
  );
};

export default Impact;
