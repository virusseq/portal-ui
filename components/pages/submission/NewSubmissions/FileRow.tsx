import { MouseEventHandler, ReactElement } from 'react';
import { useTheme } from '@emotion/react';

import { UnStyledButton } from '../../../Button';
import defaultTheme from '../../../theme';
import { Bin, File } from '../../../theme/icons';
import { getFileExtension } from './validationHelpers';

const FileRow = ({
  active = false,
  file: { name = '', type = '' },
  handleRemove = () => {
    console.log('clicked');
  },
}: {
  active: boolean;
  file: File;
  handleRemove?: MouseEventHandler<HTMLButtonElement>;
}): ReactElement => {
  const theme: typeof defaultTheme = useTheme();

  const iconFill =
    getFileExtension(name) === 'tsv' ? theme.colors.secondary_dark : theme.colors.accent3_dark;

  return (
    <tr data-type={getFileExtension(name)} data-upload={active}>
      <td>
        <File fill={iconFill} />
        {` ${name}`}
      </td>
      <td>
        <UnStyledButton onClick={handleRemove}>
          <Bin />
        </UnStyledButton>
      </td>
    </tr>
  );
};

export default FileRow;
