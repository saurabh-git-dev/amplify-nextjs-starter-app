"use client";

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
const SignIn = () => {
    const {authStatus}  = useAuthenticator();
    useEffect(() => {
        if (authStatus === 'authenticated') {
            redirect('/');
        }
    }, [authStatus]);

    if (authStatus === 'configuring') {
        return <div>Loading...</div>;
    } 

    return (
        <Authenticator />
    )
}

export default SignIn