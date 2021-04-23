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
import { useRouter } from 'next/router';

import UserDropdown from './UserDropdown';
import defaultTheme from './theme';
import useAuthContext from '../global/hooks/useAuthContext';
import { StyledLinkAsButton, InternalLink as Link } from './Link';
import { useTheme } from 'emotion-theming';
import { ABOUT_PATH, EXPLORER_PATH, ROOT_PATH, SUBMISSION_PATH, USER_PATH, TEAM_PATH } from '../global/utils/constants';
import { getConfig } from '../global/config';

const NavBar: React.ComponentType = () => {
  const { token } = useAuthContext();
  const router = useRouter();
  const theme: typeof defaultTheme = useTheme();

  const activeLinkStyle = `
    border-bottom-color: ${theme.colors.accent};
    color: ${theme.colors.accent_light};

    svg path {
      fill: ${theme.colors.accent_light};
    }
  `;

  const linkStyle = `
    align-items: center;
    border-bottom: 5px solid transparent;
    box-sizing: border-box;
    color: ${theme.colors.white};
    cursor: pointer;
    display: flex;
    flex: 0;
    font-weight: bold;
    height: 100%;
    justify-content: center;
    padding: 0 2rem;
    text-decoration: none;
    white-space: nowrap;
    width: fit-content;

    svg path {
      fill: ${theme.colors.white};
    }

    &:hover {
      ${activeLinkStyle}
    }
  `;

  return (
    <div
      css={(theme: typeof defaultTheme) => css`
        display: flex;
        justify-content: flex-start;
        height: ${theme.dimensions.navbar.height}px;
        background: ${theme.colors.primary} url(/images/navbar-bg.png) no-repeat;
        background-size: 281px;
        ${theme.shadow.default};
        position: sticky;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-left: 40px;
          cursor: pointer;
        `}
      >
        <Link path={ROOT_PATH}>
          <a
            css={(theme) => css`
              display: flex;
              align-items: center;
              text-decoration: none;
            `}
          >
            <img src="/images/navbar-logo.png" alt="logos for CanCOGeN and VirusSeq" width="296" />
          </a>
        </Link>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <div
          css={(theme) => css`
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;
          `}
        >
          <Link path={ABOUT_PATH}>
            <a
              css={(theme) => css`
                ${linkStyle}
                ${router.pathname === ABOUT_PATH ? activeLinkStyle : ''}
              `}
            >
              About VirusSeq Data Portal
            </a>
          </Link>
          <Link path={EXPLORER_PATH}>
            <a
              css={(theme) => css`
                ${linkStyle}
                ${router.pathname === EXPLORER_PATH ? activeLinkStyle : ''}
              `}
            >
              Explore VirusSeq Data
            </a>
          </Link>
          <Link path={TEAM_PATH}>
            <a
              css={(theme) => css`
                ${linkStyle}
                ${router.pathname === TEAM_PATH ? activeLinkStyle : ''}
              `}
            >
              About the Team
            </a>
          </Link>
        </div>
        {token && (
          <div
            css={(theme) => css`
              display: flex;
              align-items: center;
              justify-content: flex-end;
              height: 100%;
              width: 100%;
            `}
          >
            <Link path={SUBMISSION_PATH}>
              <a
                css={(theme) => css`
                  ${linkStyle}
                  ${router.pathname === SUBMISSION_PATH ? activeLinkStyle : ''}
                `}
              >
                Submission Dashboard
              </a>
            </Link>
            <UserDropdown
              css={css`
                float:none;
                width: 195px;
                ${linkStyle}
                ${router.pathname === USER_PATH ? activeLinkStyle : ''}

                &:hover {
                  ${activeLinkStyle}
                }
              `}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
