import { css } from '@emotion/react';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'antd';
import { ROOT_PATH } from '@/global/utils/constants';

const RequestSubmittedForm = (): ReactElement => {
    const router = useRouter();

    const navigateToHomePage = () => {
        router.push(ROOT_PATH)
    }

    return (
        <main
            css={(theme) => css`
            align-items: center;
            display: flex;
            flex-direction: column;
            padding-bottom: ${theme.dimensions.footer.height}px;
        `}
        >
        
        <div>
            <h2>Request submitted</h2>
            <p>
                We have received your request and our administrators<br />
                will contact you to validate your account.<br />                
            </p>
            <Button htmlType='button' onClick={navigateToHomePage} type="primary" size="large">Home</Button>
            
        </div>
        </main>
    );
};

export default RequestSubmittedForm;