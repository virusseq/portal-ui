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
import { css, SerializedStyles } from '@emotion/react';

const KeyCloakLogo = ({
  width,
  height,
  style,
}: {
  width: number;
  height: number;
  style?: SerializedStyles;
}): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        width: ${width};
        height: ${height};
        ${style}
      `}
      width={width}
      height={height}
      viewBox="0 0 32 32"
    >
      <defs>
        <clipPath id="clip-path">
          <rect fill="none" x="-0.01" width="32" height="32" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-path)">
        <path
          fill="#4d4d4d"
          d="M27.39,9.5a0.24,0.24,0,0,1-.21-0.12L23.57,3.12A0.24,0.24,0,0,0,23.36,3H8.63a0.24,0.24,0,0,0-.21.12L4.68,9.62h0L1.06,15.88a0.24,0.24,0,0,0,0,.24l3.61,6.26,3.75,6.5a0.24,0.24,0,0,0,.21.12H23.36a0.24,0.24,0,0,0,.21-0.12l3.61-6.26a0.24,0.24,0,0,1,.21-0.12h4.5a0.27,0.27,0,0,0,.27-0.27V9.77a0.27,0.27,0,0,0-.27-0.27h-4.5Z"
        />
        <path
          fill="none"
          d="M31.89,9.5h-27a0.24,0.24,0,0,0-.21.12h0l-0.13.23L2.89,12.72,1.06,15.88a0.24,0.24,0,0,0,0,.24l0.4,0.69,3.22,5.57a0.24,0.24,0,0,0,.21.12h27a0.27,0.27,0,0,0,.27-0.27V9.77A0.27,0.27,0,0,0,31.89,9.5Z"
        />
        <path fill="#e1e1e1" d="M5.49,15.34l-4,1.46-0.4-.69a0.24,0.24,0,0,1,0-.24l1.83-3.16Z" />
        <polygon fill="#c8c8c8" points="29.5 16.51 32.16 16.13 32.16 19.22 29.5 16.51" />
        <path fill="#c2c2c2" d="M29.5,16.51l2.66,2.7v3a0.27,0.27,0,0,1-.27.27H28.8Z" />
        <polygon fill="#c7c7c7" points="29.5 16.51 28.8 22.5 25.08 22.5 23.95 19.78 29.5 16.51" />
        <polygon fill="#cecece" points="29.5 16.51 32.16 13.27 32.16 16.13 29.5 16.51" />
        <path fill="#d3d3d3" d="M32.16,9.77v3.5L29.5,16.51l-2-7h4.4A0.27,0.27,0,0,1,32.16,9.77Z" />
        <polygon fill="#c6c6c6" points="25.08 22.5 23.11 22.5 22.61 21.77 23.95 19.78 25.08 22.5" />
        <polygon fill="#d5d5d5" points="29.5 16.51 22.14 13.4 26.01 9.5 27.49 9.5 29.5 16.51" />
        <path fill="#d0d0d0" d="M22.14,13.4l1.81,6.38,5.55-3.27Z" />
        <polygon fill="#bfbfbf" points="23.11 22.5 22.58 22.5 22.61 21.77 23.11 22.5" />
        <polygon fill="#d9d9d9" points="26.01 9.5 22.14 13.4 21.44 9.91 22.93 9.5 26.01 9.5" />
        <path fill="#d4d4d4" d="M22.14,13.4L13.2,15.46l9.4,6.31Z" />
        <path fill="#d0d0d0" d="M22.14,13.4l0.47,8.37,1.34-2Z" />
        <path fill="#d9d9d9" d="M21.44,9.91L13.2,15.46l8.93-2.06Z" />
        <polygon fill="#d8d8d8" points="13.2 15.46 9.33 22.5 7.12 22.5 5.49 15.34 13.2 15.46" />
        <path
          fill="#e2e2e2"
          d="M9.23,9.5L5.49,15.34l-1-5.49,0.13-.23h0A0.24,0.24,0,0,1,4.88,9.5H9.23Z"
        />
        <path fill="#d8d8d8" d="M7.12,22.5H4.88a0.24,0.24,0,0,1-.21-0.12L1.46,16.81l4-1.46Z" />
        <polygon fill="#e4e4e4" points="5.49 15.34 2.89 12.71 4.54 9.85 5.49 15.34" />
        <polygon
          fill="#dedede"
          points="17.29 9.5 14.71 9.5 10.76 9.5 13.2 15.46 21.44 9.91 18.96 9.5 17.29 9.5"
        />
        <polygon
          fill="#dedede"
          points="9.74 9.5 9.23 9.5 5.49 15.34 13.2 15.46 10.76 9.5 9.74 9.5"
        />
        <polygon fill="#c5c5c5" points="20.81 22.5 22.25 22.5 22.58 22.5 22.61 21.77 20.81 22.5" />
        <polygon
          fill="#d0d0d0"
          points="22.61 21.77 13.2 15.46 14.9 22.5 17.29 22.5 20.81 22.5 22.61 21.77"
        />
        <polygon
          fill="#d1d1d1"
          points="9.33 22.5 9.74 22.5 14.71 22.5 14.9 22.5 13.2 15.46 9.33 22.5"
        />
        <polygon fill="#ddd" points="21.46 9.5 21.44 9.91 22.93 9.5 22.25 9.5 21.46 9.5" />
        <polygon fill="#e3e3e3" points="18.96 9.5 21.44 9.91 21.21 9.5 18.96 9.5" />
        <polygon fill="#e2e2e2" points="21.21 9.5 21.44 9.91 21.46 9.5 21.21 9.5" />
        <path
          fill="#00b8e3"
          d="M14.68,9.61L11.05,15.9a0.21,0.21,0,0,0,0,.1H8.49l5-8.64a0.2,0.2,0,0,1,.07.07h0l1.13,2A0.22,0.22,0,0,1,14.68,9.61Z"
        />
        <path
          fill="#33c6e9"
          d="M14.68,22.62l-1.13,2a0.22,0.22,0,0,1-.08.07L8.49,16H11a0.19,0.19,0,0,0,0,.1h0l3.63,6.29A0.21,0.21,0,0,1,14.68,22.62Z"
        />
        <path
          fill="#008aaa"
          d="M13.47,7.37L8.49,16h0L7.24,18.17,6,16.1A0.19,0.19,0,0,1,6,16a0.21,0.21,0,0,1,0-.1l1.21-2.09,3.67-6.36a0.21,0.21,0,0,1,.19-0.11h2.25Z"
        />
        <path
          fill="#00b8e3"
          d="M13.47,24.64l-0.11,0H11.11a0.21,0.21,0,0,1-.19-0.11L7.57,18.75l-0.33-.58L8.49,16Z"
        />
        <path
          fill="#008aaa"
          d="M23.5,16l-5,8.64a0.23,0.23,0,0,1-.07-0.07h0l-1.13-2a0.22,0.22,0,0,1,0-.2l3.63-6.29A0.21,0.21,0,0,0,21,16H23.5Z"
        />
        <path
          fill="#00b8e3"
          d="M26,16a0.21,0.21,0,0,1,0,.11l-4.88,8.46a0.21,0.21,0,0,1-.18.1H18.62a0.23,0.23,0,0,1-.11,0l5-8.64,1.25-2.16,1.19,2.06A0.21,0.21,0,0,1,26,16Z"
        />
        <path
          fill="#00b8e3"
          d="M23.5,16H21a0.21,0.21,0,0,0,0-.11L17.31,9.61a0.21,0.21,0,0,1,0-.22l1.13-2a0.23,0.23,0,0,1,.07-0.07Z"
        />
        <path
          fill="#33c6e9"
          d="M24.75,13.84h0L23.5,16l-5-8.64a0.23,0.23,0,0,1,.11,0h2.25a0.21,0.21,0,0,1,.18.1Z"
        />
      </g>
    </svg>
  );
};

export default KeyCloakLogo;
