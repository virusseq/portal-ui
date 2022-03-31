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
import OvertureLogoWithText from '../../theme/icons/overture_logo_with_text';
import OicrLogo from '../../theme/icons/oicr';

const Portal = (): ReactElement => (
  <section>
    <div
      css={css`
        display: flex;
      `}
    >
      <p>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          VirusSeq Data Portal:{' '}
        </span>
        The VirusSeq Data Portal was designed and developed by the{' '}
        <StyledLink
          href="https://softeng.oicr.on.ca/team/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Genome Informatics Team
        </StyledLink>{' '}
        at the{' '}
        <StyledLink href="https://www.oicr.on.ca">Ontario Institute for Cancer Research</StyledLink>
        , led by Dr. Mélanie Courtot, Director of Genome Informatics and Dr. Lincoln Stein, Head of
        Adaptive Oncology. The software is powered by{' '}
        <StyledLink href="https://www.overture.bio" rel="noopener noreferrer" target="_blank">
          Overture
        </StyledLink>
        , an open-source software suite for managing and sharing data at scale on compute clouds.
      </p>

      <span
        css={css`
          width: 190px;
          margin: 0px 0 0 35px;
          padding: 25px 20px;
          border-radius: 10px;
          border: solid 1px #dfdfe1;
        `}
      >
        <StyledLink href="https://overture.bio/" rel="noopener noreferrer" target="_blank">
          <OvertureLogoWithText
            width={123}
            style={css`
              margin: -12px 0px 0px 4px;
              object-fit: contain;
            `}
          />
        </StyledLink>
        <StyledLink href="https://oicr.on.ca" rel="noopener noreferrer" target="_blank">
          <OicrLogo
            style={css`
              margin: 10px 0 0 10px;
            `}
          />
        </StyledLink>
      </span>
    </div>
  </section>
);

export default Portal;
