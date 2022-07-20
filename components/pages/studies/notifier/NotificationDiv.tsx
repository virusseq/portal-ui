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

import DismissIcon from '../../../theme/icons/dismiss';
import defaultTheme from '../../../theme/index';
import { css } from '@emotion/react';
import { Checkmark, Error } from '../../../theme/icons';

const CircularCheckmark = (
  <div
    css={css`
      padding: 6px 6px 2px 6px;
      border-radius: 50%;
      background-color: ${defaultTheme.colors.success_dark};
    `}
  >
    <Checkmark size={20} fill={defaultTheme.colors.white} />
  </div>
);

const ErrorMark = <Error size={40} />;

type NotifactionDivProps = {
  success: boolean;
  message: JSX.Element;
  title: string;
  onDismiss: () => void;
};

const NotifactionDiv = ({ success, message, title, onDismiss }: NotifactionDivProps) => {
  return (
    <div
      css={css`
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-direction: row;  
          padding: 15px 15px 20px 15px;
          border-radius: 8px;
          margin-top: 20px;
          margin-bottom: 20px;
          background-color: ${
            success ? defaultTheme.colors.success_light : defaultTheme.colors.error_1
          }};
        `}
    >
      {success ? CircularCheckmark : ErrorMark}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: 100%;
          margin-left: 15px;
        `}
      >
        <div
          css={css`
            ${defaultTheme.typography.heading}
          `}
        >
          {title}
        </div>
        <div
          css={css`
            ${defaultTheme.typography.regular}
            margin-top: 3px;
          `}
        >
          {message}
        </div>
      </div>
      <div
        css={css`
          cursor: pointer;
        `}
        onClick={onDismiss}
      >
        <DismissIcon height={15} width={15} fill={defaultTheme.colors.black} />
      </div>
    </div>
  );
};

export default NotifactionDiv;
