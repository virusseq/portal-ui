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

import { css } from '@emotion/react';
import React from 'react';
import { Column } from 'react-table';
import { RemoveSubmitterReq, Study } from '../../../global/hooks/useStudiesSvcData/types';
import { UnStyledButton } from '../../Button';
import GenericTable from '../../GenericTable';
import { Bin } from '../../theme/icons';
import defaultTheme from '../../theme/index';

type RemoveFuncGenerator = (req: RemoveSubmitterReq) => () => void;

const getTableStyle = (theme: typeof defaultTheme) => css`
  & tbody {
    tr td {
      vertical-align: top;
      text-align: left;
      border-top: 1px solid ${theme.colors.accent};
    }
  }
`;

type RemovableSubmitterRowProps = {
  hasBottomBorder: boolean;
  submitter: string;
  onDeleteClick: () => void;
};

const RemovableSubmitterRow = ({
  hasBottomBorder,
  submitter,
  onDeleteClick,
}: RemovableSubmitterRowProps) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        ${hasBottomBorder ? `border-bottom: solid 1px ${defaultTheme.colors.grey_4};` : ''};
      `}
    >
      <div
        css={css`
          margin-top: 5px;
          margin-bottom: 5px;
          margin-left: 15px;
        `}
      >
        {submitter}
      </div>

      <UnStyledButton
        onClick={onDeleteClick}
        css={css`
          margin-top: 5px;
          margin-bottom: 5px;
          margin-right: 15px;
        `}
      >
        <Bin />
      </UnStyledButton>
    </div>
  );
};

const columnData = (
  removeFuncGenerator: RemoveFuncGenerator,
): Column<Record<string, unknown>>[] => [
  {
    accessor: 'studyId',
    Header: 'Study ID',
  },
  {
    accessor: 'organization',
    Header: 'Organization',
  },
  {
    accessor: 'name',
    Header: 'Study Name',
  },
  {
    accessor: 'description',
    Header: 'Description',
  },
  {
    accessor: (row) => {
      const studyId = row.studyId;
      return (row as Study).submitters?.map((s) => ({ studyId, submitter: s }));
    },
    Header: 'Data Submitters',
    Cell: ({ value }: { value: RemoveSubmitterReq[] }) => {
      return Array.isArray(value) ? (
        <div
          css={css`
            margin-left: -10px;
            margin-right: -10px;
          `}
        >
          {value.map((v, i) => (
            <RemovableSubmitterRow
              key={i}
              submitter={v.submitter}
              onDeleteClick={removeFuncGenerator(v)}
              hasBottomBorder={i < value.length - 1}
            />
          ))}
        </div>
      ) : null;
    },
  },
];

type StudiesTableProp = {
  tableDeleteButtonFunc: RemoveFuncGenerator;
  tableData: Study[];
};

const StudiesTable = ({ tableDeleteButtonFunc, tableData }: StudiesTableProp) => {
  return (
    <GenericTable
      style={getTableStyle(defaultTheme)}
      columns={columnData(tableDeleteButtonFunc)}
      data={tableData}
      sortable={{
        defaultSortBy: [
          {
            id: 'studyId',
          },
        ],
      }}
    />
  );
};

export default StudiesTable;
