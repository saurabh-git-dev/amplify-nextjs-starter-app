// components/ConfigureAmplify.tsx
"use client";

import config from "@/amplifyconfiguration.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

Amplify.configure(config);

export default function ConfigureAmplifyClientSide(props: { children: React.ReactNode }) {
    const { children } = props;
    return <Authenticator.Provider >
        {children}
    </Authenticator.Provider>;
}