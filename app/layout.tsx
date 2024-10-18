import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import RegisterServiceWorker from '@/components/register-service-worker'

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900'
})
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900'
})

export const metadata: Metadata = {
   title: 'Cache API response by Service Worker',
   description: 'example how to cached response of API calls in cache storage by service worker | Ramin Eghbalian'
}

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en'>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <RegisterServiceWorker />
            {children}
         </body>
      </html>
   )
}
