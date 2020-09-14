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
import { useTheme } from 'emotion-theming';

import defaultTheme from '../../theme';
import { Checkmark } from '../../theme/icons';
import { ProviderType } from '../../../global/types';
import providerMap from '../../../global/utils/providerTypeMap';

const AuthenticatedBadge = ({ provider }: { provider: ProviderType }) => {
  const IconComponent = providerMap[provider].icon;
  const theme: typeof defaultTheme = useTheme();
  return (
    <div
      css={(theme) =>
        css`
          width: 235px;
          max-height: 30px;
          border: 1px solid ${theme.colors.grey_5};
          border-radius: 5px;
          background-color: ${theme.colors.white};
          ${theme.typography.data};
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2px 7px 0;
        `
      }
    >
      <span
        css={(theme) =>
          css`
            border-right: 1px solid ${theme.colors.grey_5};
            padding: 0 10px 0 0;
          `
        }
      >
        {IconComponent && <IconComponent height={20} width={20} />}
      </span>
      <span
        css={(theme) => css`
          ${theme.typography.data};
          color: ${theme.colors.accent_dark};
        `}
      >
        Authenticated with {providerMap[provider].displayName}
      </span>
      <Checkmark height={15} width={15} fill={theme.colors.primary} />
    </div>
  );
};

export default AuthenticatedBadge;
