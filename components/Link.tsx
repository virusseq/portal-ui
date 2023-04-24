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

import { ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';

import defaultTheme from './theme';
import getInternalLink from '../global/utils/getInternalLink';

const StyledLink = styled('a')`
  ${({ theme, disabled }: { theme?: typeof defaultTheme; disabled?: boolean }) => css`
    line-height: 24px;
    ${theme?.typography.regular};

    ${disabled
      ? `
      cursor: not-allowed;
      color: ${theme?.colors.grey_5};

      svg g {
        fill: ${theme?.colors.grey_5};
      }
    `
      : `
      color: '#101828';
      cursor: pointer;

      &:hover {
        color: ${theme?.colors.primary_light};
      }
    `}
  `}
`;

export const StyledLinkAsButton = styled(StyledLink)`
  ${({ theme }: { theme?: typeof defaultTheme }) => css`
    color: ${theme?.colors.white};
    background-color: ${theme?.colors.accent};
    ${theme?.typography.subheading2};
    line-height: 24px;
    border-radius: 5px;
    border: 1px solid ${theme?.colors.accent};
    padding: 6px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    &:hover {
      color: ${theme?.colors.white};
      background-color: ${theme?.colors.accent_dark};
    }
  `}
`;

export const InternalLink = ({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}): ReactElement => (
  <Link href={getInternalLink({ path })} passHref>
    {children}
  </Link>
);

export default StyledLink;
