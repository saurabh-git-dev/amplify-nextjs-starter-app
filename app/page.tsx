"use client";

import TodoList from "@/components/TodoList";
import { Button, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const { authStatus, signOut, isPending } = useAuthenticator();
  return (
    <main className={styles.main}>
      Status: {authStatus} {
        authStatus === 'unauthenticated' ?
          <Button onClick={
            () => {
              router.push('/signin')
            }
          } variation="link" borderRadius={'20px'} >
            Sign in
          </Button>
          :
          authStatus === 'authenticated' ?
            <Button isLoading={isPending} loadingText="Signing out" onClick={signOut} variation="primary" borderRadius={'20px'} >
              Sign out
            </Button>
            : null
      }

      <TodoList />
    </main>
  );
}
