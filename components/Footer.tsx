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

import React from 'react';
import { css } from '@emotion/core';

import defaultTheme from './theme';
import { OvertureLogoWithText } from './theme/icons';

import StyledLink from './Link';
import { DMS_HELP_URL, DMS_INSTALLATION_URL } from '../global/utils/constants';

const Footer = () => {
  return (
    <div
      css={(theme: typeof defaultTheme) => css`
        height: ${theme.dimensions.footer.height}px;
        background-color: ${theme.colors.white};
        border-top: 1px solid ${theme.colors.grey_3};
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 18px;
        ${theme.shadow.default};
        z-index: 10;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
      `}
    >
      <StyledLink
        css={(theme) => css`
          ${theme.typography.subheading2};
          padding-right: 13px;
        `}
        href={DMS_HELP_URL}
        target="_blank"
      >
        Help
      </StyledLink>
      |
      <StyledLink
        css={(theme) => css`
          ${theme.typography.subheading2};
          padding-left: 13px;
          padding-right: 5px;
        `}
        href={DMS_INSTALLATION_URL}
        target="_blank"
      >
        DMS
      </StyledLink>
      <span
        css={(theme) =>
          css`
            color: ${theme.colors.accent_dark};
            ${theme.typography.subheading2}
            line-height: 24px;
            font-weight: normal;
            padding-right: 10px;
            padding-left: 5px;
          `
        }
      >
        powered by
      </span>
      <a href="https://www.overture.bio/" target="_blank">
        <OvertureLogoWithText width={100} height={18} />
      </a>
    </div>
  );
};

export default Footer;
