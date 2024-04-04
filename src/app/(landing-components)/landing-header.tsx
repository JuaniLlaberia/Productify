import { MdArrowRightAlt } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import UserMenu from '@/components/user-menu';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

const LandingHeader = () => {
  return (
    <>
      <header className='fixed z-50 w-full top-0 flex justify-between items-center p-3 bg-background-2 lg:px-32 border-b border-border-1'>
        <Logo />
        <div>
          <SignedOut>
            <SignUpButton mode='modal'>
              <Button
                size='xs'
                className='group px-4 bg-background-1 border border-border-1 text-text-1 hover:bg-background-2'
              >
                Get started
                <MdArrowRightAlt
                  size={18}
                  className='translate-x-1 group-hover:translate-x-2 transition-transform  '
                />
              </Button>
            </SignUpButton>
            <SignInButton mode='modal'>
              <Button
                size='xs'
                variant='ghost'
                className='text-sm ml-3'
              >
                Log In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className='flex items-center gap-3'>
              <Link
                href='/projects'
                className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors h-8 rounded-md px-4 bg-background-1 border border-border-1 text-text-1 hover:bg-background-2'
              >
                My projects
              </Link>
              <UserMenu withText={false} />
            </div>
          </SignedIn>
        </div>
      </header>
      <section className='flex flex-col items-center justify-center text-center my-5 py-40 px-8 md:py-32 md:px-16 lg:py-48 lg:px-64'>
        <h1 className='bg-gradient-to-b from-neutral-950 dark:from-zinc-100 from-40% to-stone-400 dark:to-slate-300 bg-clip-text text-transparent text-3xl/[45px] md:text-5xl/[70px] lg:text-7xl/[100px]'>
          Organize your work
        </h1>
        <h2 className='bg-gradient-to-b from-orange-400 from-40% to-orange-600 bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl'>
          Be more efficient
        </h2>
        <p className='text-text-2 mt-3.5 mb-6 text-sm md:text-base lg:text-lg lg:mt-5 lg:mb-10'>
          Embrace a new era of productivity and collaboration today. Just be
          more productive.
        </p>
        <SignedOut>
          <SignUpButton mode='modal'>
            <Button
              size='xs'
              className='group px-4 bg-background-1 border border-border-1 text-text-1 hover:bg-background-2'
            >
              Get started
              <MdArrowRightAlt
                size={18}
                className='translate-x-1 group-hover:translate-x-2 transition-transform  '
              />
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link
            href='/projects'
            className='group inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors h-8 rounded-md px-4 bg-background-1 border border-border-1 text-text-1 hover:bg-background-2'
          >
            My projects
            <MdArrowRightAlt
              size={18}
              className='translate-x-1 group-hover:translate-x-2 transition-transform  '
            />
          </Link>
        </SignedIn>
      </section>
    </>
  );
};

export default LandingHeader;
