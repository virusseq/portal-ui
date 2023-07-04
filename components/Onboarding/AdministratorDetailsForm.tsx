import { css } from '@emotion/react';
import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { INTERNAL_PATHS } from '@/global/utils/constants';

import { useState } from "react";
import { Button, Form, Input } from 'antd';

const AdministratorDetailsForm = (): ReactElement => {
    const router = useRouter();
    const [firstName, setFirstName] = useState(''); 
    const [surname, setSurname] = useState(''); 
    const [institution, setInstitution] = useState(''); 
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [emailAddress, setEmailAddress] = useState(''); 
    const [reasonForAccess, setReasonForAccess] = useState(''); 

    const navigateToHomePage = () => {
        router.push(INTERNAL_PATHS.ONBOARDING_REQUEST_SUBMITTED)
    }
    
    const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };


    const updateSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value);
    };

    const updateInstitution = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstitution(e.target.value);
    };

    const updatePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const updateEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailAddress(e.target.value);
    };

    const updateReasonForAccess = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReasonForAccess(e.target.value);
    };
    

    return (
        <main
            css={(theme) => css`
            align-items: center;
            display: flex;
            flex-direction: column;
            padding-bottom: ${theme.dimensions.footer.height}px;
        `}
        >
        
            <h2>Your details</h2>
            <Form 
                name='administrator_details'
                colon={false}
                layout="vertical"
            >
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please fill in your first name'
                        }
                    ]}
                >
                    <Input 
                        value={firstName}
                        onChange={updateFirstName}
                    />
                </Form.Item>
                <Form.Item
                    label="Surname"
                    name="surname"
                    rules={[
                        {
                            required: true,
                            message: 'Please fill in your surname'
                        }
                    ]}
                >
                    <Input
                        value={surname}
                        onChange={updateSurname}
                    />
                </Form.Item>
                <Form.Item
                    label="Institution"
                    name="institution"
                    rules={[
                        {
                            required: true,
                            message: 'Please fill in your institution'
                        }
                    ]}
                >
                    <Input 
                        value={institution}
                        onChange={updateInstitution}
                    />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[
                        {
                            required: true,
                            message: 'Please fill in your phone number'
                        },
                        {
                            pattern: /[0-9 ]+/,
                            message: 'Not valid phone number.',
                        },
                    ]}
                >
                    <Input 
                        value={phoneNumber}
                        onChange={updatePhoneNumber}
                    />
                </Form.Item>
                <Form.Item
                    label="Email Address"
                    name="email_address"
                    rules={[
                        {
                            required: true,
                            message: 'Please fill in your email address'
                        },
                        {
                          pattern: /^\S+@\S+$/,
                          message: 'Not valid email format.',
                        },
                    ]}
                >
                    <Input  
                        value={emailAddress}
                        onChange={updateEmailAddress}
                    />
                </Form.Item>
                <Form.Item
                    label="Tell us why you require access to APA"
                    name="reason_for_access"
                    rules={[
                        {
                            required: true,
                            message: 'Please write this message to support your application'
                        }
                    ]}
                >
                    <Input 
                        value={reasonForAccess}
                        onChange={updateReasonForAccess}
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='button' type="primary" onClick={navigateToHomePage} size="large">Next</Button>
                </Form.Item>
            </Form>
        </main>
    );
};

export default AdministratorDetailsForm;