'use client';
import React, { ReactNode } from 'react'
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

type Props={
    children:ReactNode;
}
const SessionProvider = ({children}:Props) => {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}

export default SessionProvider
