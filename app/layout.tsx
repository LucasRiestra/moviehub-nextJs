import type { Metadata } from 'next'
import './global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserContextProvider } from '@/context/userContext';

export const metadata: Metadata = {
  title: 'CineXpress Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,}: {
  children: React.ReactNode}) {
  return (
    <html lang="en">
      <UserProvider>
        <UserContextProvider>
          <body>{children}</body>       
        </UserContextProvider>
      </UserProvider>
    </html>
  )
}
