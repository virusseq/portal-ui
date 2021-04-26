import { MouseEventHandler } from 'react';
import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';

import { UnStyledButton } from '../../../Button';
import defaultTheme from '../../../theme';
import { Bin, File } from '../../../theme/icons';
import { getFileExtension, getExtension } from "./validationHelpers";

const FileRow = ({
  active = false,
  file: { name = '', type = '' },
  handleRemove = () => { console.log('clicked') },
}: {
  active: boolean,
  file: File,
  handleRemove?: MouseEventHandler<HTMLButtonElement>,
}) => {
  const theme: typeof defaultTheme = useTheme();

  const iconFill = getExtension({ name }) === 'tsv'
    ? theme.colors.secondary_dark
    : theme.colors.accent3_dark;

  return (
    <tr data-type={getFileExtension(name)} data-upload={active}>
      <td>
        <File
          fill={iconFill}
        />
        {` ${name}`}
      </td>
      <td>
        <UnStyledButton
          css={css``}
          onClick={handleRemove}
        >
          <Bin />
        </UnStyledButton>
      </td>
    </tr>
  );
};

export default FileRow;
