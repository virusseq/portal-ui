import { css } from '@emotion/core';

import { IconProps } from './types';

const CrossHair = ({ fill = '#6885BA', height = 18, width = 18, style }: IconProps) => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height};
        width: ${width};
      `}
      width={width}
      height={height}
      viewBox={'0 0 20 20'}
    >
    <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path d="M12.779 9.254c-.266-.992-1.04-1.767-2.033-2.033V4.03c2.731.342 4.882 2.493 5.224 5.224h-3.191zm-2.033 6.716v-3.19c.992-.267 1.767-1.042 2.033-2.034h3.191c-.342 2.731-2.493 4.882-5.224 5.224zM9.254 7.233c-.992.266-1.767 1.04-2.033 2.033H4.03C4.367 6.53 6.519 4.373 9.254 4.03v3.203zm0 8.737c-2.731-.342-4.882-2.493-5.224-5.224h3.19c.267.992 1.042 1.767 2.034 2.033v3.191zm9.104-6.716c-.365-4.043-3.569-7.247-7.612-7.612V0H9.254v1.642C5.21 2.007 2.008 5.21 1.642 9.254H0v1.492h1.642c.366 4.043 3.569 7.247 7.612 7.612V20h1.492v-1.642c4.043-.365 7.247-3.569 7.612-7.612H20V9.254h-1.642z" transform="translate(-628 -398) translate(-31 -9) translate(0 73) translate(659 255) translate(0 72) translate(0 7)"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CrossHair;
