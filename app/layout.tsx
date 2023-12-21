'use client'

import './global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserContextProvider } from '@/context/userContext';
import { Bebas_Neue } from 'next/font/google';
import { DarkModeProvider } from '@/context/darkModeContext';
import { Toaster } from 'react-hot-toast';

const font = Bebas_Neue ({
  subsets: ['latin'],
  weight: '400'
});

export default function RootLayout({
  children,}: {
  children: React.ReactNode}) {
  return (
    <html lang="en">
      
      <UserProvider>
      <DarkModeProvider>
        <UserContextProvider>
            <body className={font.className}>
            <Toaster />
            {children}
          </body>       
        </UserContextProvider>
        </DarkModeProvider>
      </UserProvider>
    </html>
  )
}
