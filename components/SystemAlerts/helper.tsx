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
import { Error, Warning } from '../theme/icons';
import { IconProps } from '../theme/icons/types';

export type AlertLevel = 'error' | 'warning' | 'info';

type AlertVariant = {
    color: string;
    icon: (props: IconProps) => ReactElement;
    fill: string;
  };


const ALERT_VARIANTS: Record<AlertLevel, AlertVariant> = {
  error: {
    color: defaultTheme.colors.error_1,
    icon: Error,
    fill: 'white',
  },
  warning: {
    color: defaultTheme.colors.warning,
    icon: Warning,
    fill: 'primary_dark',
  },
  info: {
    color: 'white',
    icon: Warning,
    fill: 'white',
  },
};

export type Alert = {
  level: AlertLevel;
  title: string;
  message?: string;
  dismissable: boolean;
  id: string;
};

type AlertProps = {
  alert: Alert;
  onClose: () => void;
};


const SystemAlert: React.ComponentType<AlertProps> = ({ alert, onClose }) => {
  return (
    <div
      css={css`
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        background-color: ${ALERT_VARIANTS[alert.level].color}
      `}
    >
      <div css={css`display: flex;`} >
        <div css={css`margin: auto 15px auto auto;`}> 
           {alert.level === 'error' && <Error size={40} />}
           {alert.level === 'warning' && <Warning size={40} />}
           {alert.level === 'info' && <Warning size={40} />}
        </div>
        <div css={css`margin-bottom: 8px;`}>
          <div css={css`${defaultTheme.typography.heading} `}>
            {alert.title}
          </div>
          <div css={css`${defaultTheme.typography.regular}`}>
            {alert.message}
          </div>
        </div>
      </div>

      <div css={css`cursor: pointer;`} onClick={onClose}>
        {alert.dismissable && (
          <DismissIcon height={15} width={15} fill={defaultTheme.colors.black} />
        )}
      </div>        
    </div>
      
  );
};

export default SystemAlert;
