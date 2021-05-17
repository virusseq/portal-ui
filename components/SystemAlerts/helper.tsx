/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { css } from '@emotion/react';
import React, { ReactElement } from 'react';
import DismissIcon from '../theme/icons/dismiss';
import defaultTheme from '../theme';
import { Info, Error } from '../theme/icons';

export type AlertLevel = 'error' | 'warning' | 'info';

type AlertVariant = {
  backgroundColor: string;
  icon: ReactElement;
  textColor: string;
};

type AlertProps = {
  alert: Alert;
  onClose: () => void;
};

export type Alert = {
  level: AlertLevel;
  title: string;
  message?: string;
  dismissable: boolean;
  id: string;
};

const ALERT_VARIANTS: Record<AlertLevel, AlertVariant> = {
  error: {
    backgroundColor: defaultTheme.colors.error_1,
    icon: <Error size={40} />,
    textColor: defaultTheme.colors.black,
  },
  warning: {
    backgroundColor: defaultTheme.colors.warning_1,
    icon: <Error size={40} fill={defaultTheme.colors.warning_dark} />,
    textColor: defaultTheme.colors.black,
  },
  info: {
    backgroundColor: defaultTheme.colors.secondary_2,
    icon: <Info size={40} fill={defaultTheme.colors.secondary_dark} />,
    textColor: defaultTheme.colors.black,
  },
};

const SystemAlert: React.ComponentType<AlertProps> = ({ alert, onClose }) => {
  const { backgroundColor, textColor, icon } = ALERT_VARIANTS[alert.level];
  return (
    <div
      css={css`
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        background-color: ${backgroundColor};
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            margin: auto 15px auto auto;
          `}
        >
          {icon}
        </div>
        <div
          css={css`
            margin-bottom: 8px;
          `}
        >
          <div
            css={css`
              color: ${textColor};
              ${defaultTheme.typography.heading}
            `}
          >
            {alert.title}
          </div>
          <div
            css={css`
              color: ${textColor};
              ${defaultTheme.typography.regular}
            `}
          >
            {alert.message}
          </div>
        </div>
      </div>

      <div
        css={css`
          cursor: pointer;
        `}
        onClick={onClose}
      >
        {alert.dismissable && (
          <DismissIcon height={15} width={15} fill={defaultTheme.colors.black} />
        )}
      </div>
    </div>
  );
};

export default SystemAlert;
