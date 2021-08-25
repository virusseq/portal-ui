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

import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';
import urlJoin from 'url-join';

import { getConfig } from '../../../../global/config';
import useTrackingContext from '../../../../global/hooks/useTrackingContext';
import defaultTheme from '../../../theme';
import { PageContentProps } from '../index';
import DownloadInfoModal from './DownloadInfoModal';
import { Download } from '../../../theme/icons';
import Button from '../../../Button';
import useSingularityData, { Archive } from '../../../../global/hooks/useSingularityData';
import sleep from '../../../utils/sleep';
import { isEmpty } from 'lodash';
import { buildSqonWithObjectIds, saveSet } from './helper';

const Table = dynamic(
  () => import('@arranger/components/dist/Arranger').then((comp) => comp.Table),
  { ssr: false },
) as FunctionComponent<Record<string, unknown>>;

const getTableStyle = (theme: typeof defaultTheme) => css`
  border-radius: 5px;
  background-color: ${theme.colors.white};
  padding: 8px;
  margin-bottom: 12px;
  ${theme.shadow.default};

  & .tableToolbar {
    background-color: ${theme.colors.white};
    padding: 10px 8px;
    ${theme.typography.label};
    font-weight: normal;
    height: 32px;

    .type {
      display: none;
    }

    & .group {
      height: 32px;
      & .buttonWrapper button,
      & .dropDownHeader button {
        align-items: center;
        border-radius: 5px;
        border: solid 1px ${theme.colors.grey_5};
        height: 26px;
        background-color: ${theme.colors.white};
        color: ${theme.colors.accent_dark};
        ${theme.typography.subheading2};

        &:focus {
          outline: none;
        }

        &:disabled {
          background-color: ${theme.colors.grey_3};
          color: ${theme.colors.grey_6};
        }

        &:not(:disabled):hover {
          background-color: ${theme.colors.secondary_light};
        }
      }

      & .buttonWrapper button:before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20'%3E%3Cpath fill='%23${theme.colors.primary.slice(
          1,
        )}' fill-rule='evenodd' d='M1.32 17.162h17.162c.729 0 1.32.59 1.32 1.32 0 .73-.591 1.32-1.32 1.32H1.32c-.729 0-1.32-.59-1.32-1.32 0-.73.591-1.32 1.32-1.32zm4.93-8.87l2.232 2.227V1.512c0-.774.63-1.402 1.406-1.402.777 0 1.406.628 1.406 1.402v9.032l2.257-2.252c.55-.548 1.44-.548 1.989 0 .549.547.55 1.435 0 1.983l-4.976 4.963c-.366.365-.96.365-1.327 0l-4.975-4.963c-.549-.548-.549-1.435 0-1.983.55-.548 1.439-.548 1.988 0z'/%3E%3C/svg%3E%0A");
        margin-top: 2px;
        margin-right: 4px;
      }
      & .dropDownHeader button {
        margin-right: 8px;

        &:after {
          content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${theme.colors.grey_6.slice(
            1,
          )}' fill-rule='evenodd' d='M9.952 3.342c.468-.456 1.228-.456 1.697 0 .234.228.351.526.351.825 0 .298-.117.597-.351.825l-4.8 4.666c-.469.456-1.23.456-1.697 0l-4.8-4.666c-.47-.456-.47-1.194 0-1.65.468-.456 1.228-.456 1.696 0L6 7.184l3.952-3.842z'/%3E%3C/svg%3E");
          margin-top: 2px;
          margin-left: -3px;
        }

        &:not(:disabled) {
          &:after {
            content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${theme.colors.primary.slice(
              1,
            )}' fill-rule='evenodd' d='M9.952 3.342c.468-.456 1.228-.456 1.697 0 .234.228.351.526.351.825 0 .298-.117.597-.351.825l-4.8 4.666c-.469.456-1.23.456-1.697 0l-4.8-4.666c-.47-.456-.47-1.194 0-1.65.468-.456 1.228-.456 1.696 0L6 7.184l3.952-3.842z'/%3E%3C/svg%3E");
          }

          .dropDownButtonContent {
            color: ${theme.colors.primary};
          }
        }
      }

      & .dropDownButton svg {
        display: none;
      }
      & div.dropDownContent {
        right: 7px !important;
        border-radius: 5px;
        ${theme.shadow.default};
      }
      & .dropDownContent {
        max-width: 200px;
        max-height: 285px;
        overflow-y: auto;
        top: 82%;

        ${theme.typography.label};
        font-weight: normal;

        /* left-orient checkboxes */
        &.multiple {
          .dropDownContentElement {
            margin-left: 15px;
            padding-left: 8px;
            position: relative;
          }
          & .dropDownContentElement input[type='checkbox' i] {
            position: absolute;
            left: -17px;
            bottom: 4px;
          }
        }
      }
    }
  }

  & .ReactTable {
    background-color: ${theme.colors.white};
    border: none;
    &.rt-tr-group .rt-tr {
      &.selected {
        background-color: pink;
      }
    }
    & .rt-tbody {
      border: 1px solid ${theme.colors.grey_3};
      border-right: none;
      & .rt-td {
        border-right: 1px solid ${theme.colors.grey_3};
        ${theme.typography.data};
        padding-bottom: 2px;
        & div {
          text-align: left !important;
          vertical-align: middle;
        }
      }
    }
    & .rt-thead {
      border-top: 1px solid ${theme.colors.grey_3};
      border-left: 1px solid ${theme.colors.grey_3};
      & .rt-tr .rt-th {
        border-right: 1px solid ${theme.colors.grey_3};
        padding: 6px 5px 2px;
        &.-sort-asc {
          box-shadow: inset 0 3px 0 0 ${theme.colors.secondary};
        }
        &.-sort-desc {
          box-shadow: inset 0 -3px 0 0 ${theme.colors.secondary};
        }
        &:focus {
          outline: none;
        }
      }
    }
    & .rt-thead .rt-th {
      ${theme.typography.data};
      font-weight: bold;
      text-align: left;
      color: ${theme.colors.accent_dark};
    }
    & .rt-td .td-actions {
      width: 100%;
      display: inline-block;
      text-align: center;
    }
    & .rt-tr-group {
      border-bottom: none;
      border-top: none;
      &:hover {
        background: ${theme.colors.grey_highlight};
      }
    }
    & .rt-tr-group .rt-tr.-even {
      &:hover {
        background: ${theme.colors.grey_highlight};
      }
    }
    & .rt-tr-group .rt-tr.-odd {
      background-color: ${theme.colors.grey_1};
      &:hover {
        background: ${theme.colors.grey_highlight};
      }
    }
    & .pagination-bottom {
      & .-pagination {
        padding: 0px;
        height: 45px;
        box-shadow: none;
        border: none;
        ${theme.typography.label};
        font-weight: normal;
        & .-pageJump {
          border: none;
          display: flex;
          font-size: 13px;
          justify-content: space-around;
          & .-pagination_button {
            cursor: pointer;
            background-position: center;
            background-color: ${theme.colors.white};
            margin: 0 6px;
            height: 24px;
            width: 24px;
            border-radius: 25px;
            text-align: center;
            padding-top: 3px;
          }
          & .-pagination_button.-current {
            background-color: ${theme.colors.secondary_1};
          }
          & .-toStart,
          & .-previous,
          & .-next,
          & .-toEnd {
            font-weight: normal;
          }
          & .-toStart,
          & .-toEnd {
            letter-spacing: -2px;
          }
        }
      }
      & select {
        padding: 5px 10px 5px 5px;
        appearance: none;
        width: 45px;
        text-align: left;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%23151c3d' fill-rule='evenodd' d='M9.952 3.342c.468-.456 1.228-.456 1.697 0 .234.228.351.526.351.825 0 .298-.117.597-.351.825l-4.8 4.666c-.469.456-1.23.456-1.697 0l-4.8-4.666c-.47-.456-.47-1.194 0-1.65.468-.456 1.228-.456 1.696 0L6 7.184l3.952-3.842z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: bottom 7px right 4px;
      }
    }
  }
`;

const RepoTable = (props: PageContentProps): ReactElement => {
  const {
    startArchiveBuildBySetId,
    findArchvieById,
    fetchLatestArchiveAllInfo,
  } = useSingularityData();

  const theme: typeof defaultTheme = useTheme();
  const { logEvent } = useTrackingContext();
  const { NEXT_PUBLIC_SINGULARITY_API_URL } = getConfig();

  const [archive, setArchive] = useState<Archive>();
  const [showDownloadInfoModal, setShowDownloadInfoModal] = useState(false);

  const showModal = () => setShowDownloadInfoModal(true);
  const closeModal = () => {
    setShowDownloadInfoModal(false);
    setArchive(undefined);
  };

  const saveSetThenBuildArchive = async (sqon: object): Promise<Archive> => {
    const setId = await saveSet(sqon);
    logEvent({
      category: 'Downloads',
      action: 'Archvie Build',
    });
    return await startArchiveBuildBySetId(setId);
  };

  const updateArchiveState = async () => {
    if (archive?.status === 'BUILDING') {
      await sleep(5000);
      await findArchvieById(archive.id).then(setArchive);
    } else if (archive?.status === 'COMPLETE') {
      logEvent({
        category: 'Downloads',
        action: 'Archvie Download',
      });

      window.location.assign(
        urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, '/download/archive/', archive.id),
      );
    }
  };

  useEffect(() => {
    updateArchiveState();
  }, [archive]);

  const handleDownload = () => {
    showModal();

    const sqonToUse = buildSqonWithObjectIds(props.sqon, props.selectedTableRows);

    const archviePromise = isEmpty(sqonToUse)
      ? fetchLatestArchiveAllInfo()
      : saveSetThenBuildArchive(sqonToUse);

    archviePromise.then(setArchive);
  };

  const DownloadButton = (
    <Button
      onClick={handleDownload}
      css={css`
        display: flex;
        height: 25px;
        flex-direction: row;
        align-items: center;
        column-gap: 3px;
        padding-left: 10px;
        padding-right: 10px;
        margin-right: 8px;
        background-color: ${theme.colors.success_dark};
        &:hover {
          background-color: ${theme.colors.success_dark};
        }
      `}
    >
      <Download fill={'white'} /> <span>Download Dataset</span>
    </Button>
  );
  return (
    <div>
      <div css={getTableStyle(theme)}>
        <Table
          {...props}
          allowTSVExport={false}
          showFilterInput={false}
          columnDropdownText={'Columns'}
          customHeaderContent={DownloadButton}
        />
      </div>

      {showDownloadInfoModal && <DownloadInfoModal onClose={closeModal} archive={archive} />}
    </div>
  );
};

export default RepoTable;
