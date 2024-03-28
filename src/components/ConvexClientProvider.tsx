'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'light' ? undefined : dark,
        elements: {
          formButtonPrimary: 'bg-[#2b2929] hover:bg-[#1b1a1a]',
          footerActionLink: 'text-[#ff9a27] underline hover:text-[#f3a64f]',
        },
        variables: { colorPrimary: '#2b2929' },
      }}
      afterSignInUrl='/projects'
      afterSignUpUrl='/projects'
      signInUrl='/'
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk
        client={convex}
        useAuth={useAuth}
      >
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
