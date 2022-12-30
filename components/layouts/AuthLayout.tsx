import React,{ ReactNode } from 'react'
import Head from 'next/head'

interface Props {
    children: ReactNode;
  }

const AuthLayout = ({children}: Props) => {
  return (
    <div className='bg-indigo-900 h-screen w-screen'>
        <Head>
            <title>lite thinking</title>
        </Head>
        <main className='flex flex-col justify-center items-center h-screen'>
                {children}
        </main>
    </div>
  )
}

export default AuthLayout