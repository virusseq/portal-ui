import { css } from '@emotion/react';

import { IconProps } from './types';

const Bin = ({ fill = '#28519D', size = 18, style }: IconProps) => {
  return (
    <svg
      css={css`
        ${style};
        height: ${size}px;
        width: ${size}px;
      `}
      width={size}
      height={size}
      viewBox={`0 0 18 18`}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <path
            d="M16.552 2.348H12.64V.86C12.64.274 12.13 0 11.465 0H6.77c-.666 0-1.174.274-1.174.86v1.488H1.683c-.43 0-.783.352-.783.782 0 .43.352.783.783.783h.39v10.37C2.074 16.317 3.6 18 5.44 18h7.709c1.643 0 2.974-1.487 2.974-3.326V3.913h.391c.43 0 .783-.352.783-.783 0-.43-.313-.782-.744-.782zM7.161 1.174h3.913v1.174H7.16V1.174zM6.77 13.696c0 .43-.353.782-.783.782-.43 0-.783-.352-.783-.782V6.652c0-.43.353-.782.783-.782.43 0 .783.352.783.782v7.044zm3.13 0c0 .43-.352.782-.783.782-.43 0-.782-.352-.782-.782V6.652c0-.43.352-.782.782-.782.43 0 .783.352.783.782v7.044zm3.13 0c0 .43-.352.782-.782.782-.43 0-.783-.352-.783-.782V6.652c0-.43.352-.782.783-.782.43 0 .782.352.782.782v7.044z"
            transform="translate(-1333 -378) translate(60 103) translate(667) translate(0 220) translate(1 9) translate(18 44) translate(587 2)"
          />
        </g>
      </g>
    </svg>
  );
};

export default Bin;
