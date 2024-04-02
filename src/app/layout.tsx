import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

import ConvexClientProvider from '@/components/ConvexClientProvider';
import './globals.css';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Productify',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`h-screen ${inter.className}`}>
        <NextTopLoader color='#ff9a27' />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ThemeProvider>
        <Toaster
          expand={true}
          richColors
        />
      </body>
    </html>
  );
}
