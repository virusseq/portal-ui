import { css } from '@emotion/react';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { InternalLink } from '../Link';
import { INTERNAL_PATHS } from '../../global/utils/constants';

const RegisterPage = (): ReactElement => {
    const router = useRouter();

    const navigateToAdministratorDetails = () => {
        router.push('/onboarding/administrator_details')
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
            <h2>Request access</h2>
            <h4>Welcome to African Pathogen Archive</h4>
            <p>
                Currently this platform only allows the African<br />
                Institutional Heads of verified Departments to<br />
                onboard before the colleagues.<br />
            </p>        
            <p>
                Once they have been onboarded, they become administrators,<br />
                which allows them to invite and assign roles to their<br />
                templateSettings.<br />
            </p>
            <p>
                Our administrator will get into contact with you and<br />
                review your application.  This process may take<br />
                between 14-28 days.<br />
            </p>
            <Button htmlType='button' onClick={navigateToAdministratorDetails} type="primary" size="large">Register</Button>
            <div>
                <span>Already have an account? <InternalLink path={INTERNAL_PATHS.LOGIN}>Login</InternalLink></span>
            </div>
        </div>
        </main>
    );
};

export default RegisterPage;


