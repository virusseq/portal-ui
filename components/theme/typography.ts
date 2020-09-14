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

// /** @jsx jsx */ import { css } from '@emotion/core';
import { css } from '@emotion/core';

const baseFont = css`
  font-family: Lato, sans-serif;
`;

const regular = css`
  ${baseFont}
  font-size: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-stretch: inherit;
  line-height: inherit;
  letter-spacing: inherit;
`;

const button = css`
  ${baseFont}
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: normal;
`;

const heading = css`
  ${baseFont}
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: normal;
`;

const subheading = css`
  ${baseFont}
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: normal;
`;

const subheading2 = css`
  ${baseFont}
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
`;

const label = css`
  ${baseFont}
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
`;

const label2 = css`
  ${baseFont}
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: normal;
`;

const data = css`
  ${baseFont}
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
`;

export default {
  regular,
  heading,
  subheading,
  subheading2,
  label,
  label2,
  data,
  button,
};
