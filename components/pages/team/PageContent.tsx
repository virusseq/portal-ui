import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import Title from './Title';
import Funding from './Funding';
import Parners from './Partners';
import Portal from './Portal';
import Cloud from './Cloud';

const PageContent = () => {
    return (
      <main
        css={(theme) => css`
          margin: 40px 5px 100px 5px;
          padding: 40px 40px 55px 38px;
          box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
          background-color: var(--white);
          
          @media (min-width: 960px) {
            max-width: calc(50%);
            margin: 40px 285px 100px;
          }
        `}  
      >
        <Title/>
        <Funding/>
        <Parners/>
        <Portal/>
        <Cloud/>
      </main>
    );
  };
  
  export default PageContent;