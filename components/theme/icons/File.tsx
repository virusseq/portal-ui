import { css } from '@emotion/core';

import { IconProps } from './types';

const File = ({ fill = '#6885BA', height = 16, width = 16, style }: IconProps) => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height};
        width: ${width};
      `}
      width={width}
      height={height}
      viewBox={'0 0 16 16'}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <path d="M10.626.41l2.871 2.872h-2.871V.41zM1.6 0h8.205v3.692c0 .215.196.41.41.41h3.693V16H1.6V0z" transform="translate(-630 -327) translate(-31 -9) translate(0 73) translate(659 255) translate(2) translate(0 8)"/>
        </g>
    </g>
</svg>
);
};

export default File;
