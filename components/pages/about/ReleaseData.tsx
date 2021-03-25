import { css } from '@emotion/core';

// import { PageContentProps } from './index';
import { StyledLinkAsButton } from '../../Link';
import { Covid, CrossHairs, File, Storage } from '../../theme/icons';

const ReleaseData = () => (
  <main
    css={(theme) => css`
      display: flex;
    `}
  >
    <aside
      css={(theme) => css`
        margin-right: 30px;
      `}
    >
      <header
        css={(theme) => css`
          & > * {
            margin: 0;
          }
        `}
      >
        <h3
          css={(theme) => css`
            font-size: 17px;
            font-weight: normal;
          `}
        >
          Data
        </h3>
        <p
          css={(theme) => css`
            font-size: 14px;
          `}
        >
          Month day, year
        </p>
      </header>

      <ul
        css={(theme) => css`
          list-style: none;
          padding: 0;

          li {
            align-items: center;
            display: flex;
            padding-left: 25px;
            position: relative;

            &:not(:first-of-type) {
              margin-top: 10px;
            }
          }

          svg {
            left: 0;
            position:absolute;
          }

          span {
            font-weight: bold;
            margin-right: 5px;
          }
        `}
      >
        <li><File /><span>#</span>Files</li>
        <li><Covid /><span>#</span>Viral Genomes</li>
        <li><CrossHairs style={css`margin-left: -1px;`} /><span>#</span>Studies</li>
        <li><Storage /><span>#</span>PB</li>
      </ul>
    </aside>

    <figure
      css={(theme) => css`
        margin: 0;
      `}
    >
      Files by Variant Type
    </figure>


  </main>
);

export default ReleaseData;
