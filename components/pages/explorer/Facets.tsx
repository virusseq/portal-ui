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

import { css } from '@emotion/core';
import dynamic from 'next/dynamic';

import { PageContentProps } from '.';
import defaultTheme from '../../theme';

const Aggregations = dynamic(
  import('@arranger/components/dist/Arranger').then((comp) => comp.Aggregations),
  { ssr: false },
) as any;

const getFacetStyles = (theme: typeof defaultTheme) => css`
  padding-bottom: 2rem;
  .input-range-wrapper div {
    ${theme.typography.label2}
    font-weight: bold;
    background-color: ${theme.colors.grey_3};
    border-radius: 3px;
    padding: 0 4px;
    &:last-of-type,
    &:nth-of-type(4) {
      background-color: ${theme.colors.white};
      color: ${theme.colors.grey_6};
    }
    &:nth-of-type(3) {
      background-color: ${theme.colors.white};
    }
  }
  .aggregations {
    .aggregation-card {
      border-bottom: 1px solid ${theme.colors.grey_3};
      padding-right: 8px;
      &:first-of-type {
        margin-top: 0;
      }
      border-left: 3px solid;
      &:nth-of-type(5n + 1) {
        border-left-color: ${theme.colors.secondary};
      }
      &:nth-of-type(5n + 2) {
        border-left-color: ${theme.colors.accent2};
      }
      &:nth-of-type(5n + 3) {
        border-left-color: ${theme.colors.warning};
      }
      &:nth-of-type(5n + 4) {
        border-left-color: ${theme.colors.primary};
      }
      &:nth-of-type(5n + 5) {
        border-left-color: ${theme.colors.accent3};
      }
      .header {
        padding: 5px 0 6px 6px;
        .title-wrapper {
          align-items: flex-start;
          border-bottom: 1px solid ${theme.colors.grey_2};
          padding-bottom: 5px;
          .title-control {
            flex: 1;
            cursor: pointer;
            padding-top: 2px;
          }
          &.collapsed {
            background-color: ${theme.colors.grey_2};
            margin: -5px -8px -6px -7px;
            padding: 5px 8px 6px 6px;
          }
          & .title {
            ${theme.typography.subheading}
            color: ${theme.colors.accent_dark};
            margin-left: 8px;
            display: inline-block;
            width: 90%;
            line-height: 20px;
          }
          & .arrow {
            display: inline-block;
            height: 100%;
            vertical-align: top;
            transition: all 0s !important;
            &:after {
              display: inline-block;
              transform: translateX(-2px) rotate(270deg);
              content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 12 12'%3E%3Cpath fill='%23151c3d' fill-rule='evenodd' d='M9.952 3.342c.468-.456 1.228-.456 1.697 0 .234.228.351.526.351.825 0 .298-.117.597-.351.825l-4.8 4.666c-.469.456-1.23.456-1.697 0l-4.8-4.666c-.47-.456-.47-1.194 0-1.65.468-.456 1.228-.456 1.696 0L6 7.184l3.952-3.842z'/%3E%3C/svg%3E ");
            }
          }
          &.collapsed {
            & .arrow {
              &:after {
                display: inline-block;
                transform: translateX(-2px) rotate(-90deg);
                content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 12 12'%3E%3Cpath fill='%23151c3d' fill-rule='evenodd' d='M9.952 3.342c.468-.456 1.228-.456 1.697 0 .234.228.351.526.351.825 0 .298-.117.597-.351.825l-4.8 4.666c-.469.456-1.23.456-1.697 0l-4.8-4.666c-.47-.456-.47-1.194 0-1.65.468-.456 1.228-.456 1.696 0L6 7.184l3.952-3.842z'/%3E%3C/svg%3E ");
              }
            }
          }
        }
      }
      & .bucket {
        & .bucket-item {
          display: flex;
          justify-content: space-between;
          ${theme.typography.data}
          align-items: center;
          padding-bottom: 2px;
          & .bucket-count {
            ${theme.typography.label2}
            display: inline-block;
            background-color: ${theme.colors.grey_3};
            padding: 0 3px;
            border-radius: 3px;
            margin: 2px 0;
          }
          & .bucket-link {
            display: flex;
            align-items: center;
          }
        }
        &:last-of-type {
          padding-bottom: 4px;
        }
      }
      & .showMore-wrapper {
        ${theme.typography.label2};
        color: ${theme.colors.accent};
        text-decoration: underline;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      & .showMore-wrapper.more {
        &:before {
          padding-top: 3px;
          margin-right: 3px;
          content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'%3E%3Cpath fill='%2304518C' fill-rule='evenodd' d='M7.637 6.029H6.034v1.613c0 .291-.24.53-.534.53-.294 0-.534-.239-.534-.53V6.03H3.363c-.294 0-.534-.238-.534-.529 0-.29.24-.529.534-.529h1.603V3.358c0-.291.24-.53.534-.53.294 0 .534.239.534.53V4.97h1.603c.294 0 .534.238.534.529 0 .29-.24.529-.534.529M5.5 0C2.462 0 0 2.462 0 5.5S2.462 11 5.5 11 11 8.538 11 5.5 8.538 0 5.5 0'/%3E%3C/svg%3E%0A");
        }
      }
      & .showMore-wrapper.less {
        &:before {
          padding-top: 3px;
          margin-right: 3px;
          content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 20 20'%3E%3Cpath fill='%2304518c' fill-rule='evenodd' d='M13.81 10.952H6.19c-.523 0-.952-.428-.952-.952s.429-.952.952-.952h7.62c.523 0 .952.428.952.952s-.429.952-.952.952M10 0C4.476 0 0 4.476 0 10s4.476 10 10 10 10-4.476 10-10S15.524 0 10 0'/%3E%3C/svg%3E%0A");
        }
      }
      & .filter .inputWrapper {
        border-radius: 5px;
        box-shadow: 0 0 4px 1px rgba(155, 199, 237, 0.8);
        border: 1px solid ${theme.colors.secondary};
        margin: 6px 5px 7px 0;
        & input {
          ${theme.typography.data}
          &::placeholder {
            color: ${theme.colors.black};
            margin-left: 5px;
          }
        }
        input[type='text' i] {
          margin-left: 5px;
          margin-top: 2px;
        }
      }

      & .bucket .range-wrapper {
        .input-range {
          margin-bottom: 30px;
        }

        .input-range__track.input-range__track--background {
          background-color: ${theme.colors.grey_4};
          .input-range__track--active {
            background-color: ${theme.colors.secondary};
          }
          .input-range__slider-container {
            .input-range__slider {
              background-color: ${theme.colors.white};
              border-color: ${theme.colors.grey_5};
              ${theme.shadow.default}
              padding: 0;
              border-radius: 100%;
            }
          }
        }
      }
      .toggle-button {
        ${theme.typography.data};
        padding: 2px 5px 8px 5px;
        margin-left: 5px;
        .toggle-button-option {
          border: 1px solid ${theme.colors.grey_5};
          &:nth-of-type(2) {
            border-left: 0px;
            border-right: 0px;
          }
        }
        .toggle-button-option .bucket-count {
          ${theme.typography.label2}
          display: inline-block;
          background-color: ${theme.colors.grey_3};
          padding: 0 3px;
          border-radius: 3px;
        }
        .toggle-button-option.active {
          background-color: ${theme.colors.secondary_light};
          .bucket-count {
            background-color: ${theme.colors.secondary_2};
          }
        }
        .toggle-button-option.disabled {
          background-color: ${theme.colors.grey_2};
          color: ${theme.colors.grey_6};
        }
      }

      & .action-icon {
        margin-left: 5px;
        margin-top: 2px;
        svg {
          fill: ${theme.colors.secondary};
          width: 14px;
          height: 14px;
          padding-bottom: 3px;
        }
      }
    }
  }
`;

const Facets = (props: PageContentProps) => {
  return (
    <div css={(theme) => getFacetStyles(theme)}>
      <h2
        css={(theme) => css`
          ${theme.typography.subheading}
          padding: 6px 0 2px 8px;
          margin: 0;
          border-bottom: 1px solid ${theme.colors.grey_3};
        `}
      >
        Filters
      </h2>
      <Aggregations {...props} />
    </div>
  );
};

export default Facets;
