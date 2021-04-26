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
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import defaultTheme from './theme';
import { GenomeCanadaLogo, GitHubLogo, OvertureLogoWithText } from './theme/icons';

import useAuthContext from '../global/hooks/useAuthContext';
import StyledLink, { InternalLink } from './Link';

const Footer = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const { token } = useAuthContext();

  return (
    <div
      css={css`
        height: ${theme.dimensions.footer.height}px;
        background-color: ${theme.colors.white};
        border-top: 1px solid ${theme.colors.grey_3};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        ${theme.shadow.default};
        z-index: 10;
        overflow: hidden;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
      `}
    >
      <a href="https://www.genomecanada.ca/" rel="noopener noreferrer" target="_blank">
        <GenomeCanadaLogo width={85} />
      </a>
      <section
        css={css`
          display: flex;
          flex-direction: column;
          height: 60%;
          justify-content: space-between;
          align-items: center;

          & a,
          & span {
            ${theme.typography.subheading2};
            font-weight: normal;
          }
        `}
      >
        <ul
          css={css`
            display: flex;
            margin: 0;
            padding: 0;

            & li {
              display: inline;
              padding: 0 20px;
              position: relative;

              &:not(:first-of-type)::before {
                color: ${theme.colors.accent};
                content: '•';
                font-size: 10px;
                left: -3px;
                position: absolute;
                top: 5px;
              }
            }
          `}
        >
          <li>
            <StyledLink
              href="https://www.genomecanada.ca/en/cancogen"
              rel="noopener noreferrer"
              target="_blank"
            >
              About CanCOGeN
            </StyledLink>
          </li>

          <li>
            <InternalLink path="/policies">
              <StyledLink>Policies</StyledLink>
            </InternalLink>
          </li>

          <li>
            <StyledLink
              href="mailto:info@virusseq-dataportal.ca"
              rel="noopener noreferrer"
              target="_blank"
            >
              Contact Us
            </StyledLink>
          </li>

          {!token && (
            <li>
              <InternalLink path="/login">
                <StyledLink>Submitter Login</StyledLink>
              </InternalLink>
            </li>
          )}
        </ul>
        <span>
          &#169;
          {` ${new Date().toISOString().slice(0, 4)} Canadian VirusSeq Data Portal`}
        </span>
      </section>

      <section
        css={css`
          display: flex;
        `}
      >
        <span
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <span
            css={(theme) =>
              css`
                color: ${theme.colors.accent_dark};
                ${theme.typography.subheading2}
                font-weight: normal;
                padding-right: 10px;
              `
            }
          >
            Powered by:
          </span>
          <a
            css={css`
              margin-top: 5px;
            `}
            href="https://www.overture.bio/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <OvertureLogoWithText width={100} height={18} />
          </a>
        </span>

        <a
          css={css`
            align-items: center;
            color: ${theme.colors.primary};
            display: flex;
            font-weight: bold;
            justify-content: center;
            margin-left: 20px;
            text-decoration: none;
          `}
          href="https://github.com/cancogen-virus-seq"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubLogo height={20} width={20} />
          <span
            css={css`
              margin-left: 5px;
            `}
          >
            VirusSeq Github
          </span>
        </a>
      </section>
    </div>
  );
};

export default Footer;
