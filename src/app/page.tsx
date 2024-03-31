import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import UserMenu from '@/components/user-menu';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { MdArrowRightAlt } from 'react-icons/md';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <main>
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
              <Button size='xs' variant='ghost' className='text-sm ml-3'>
                Log In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className='flex items-center gap-3'>
              <Button
                size='xs'
                className='group px-4 bg-background-1 border border-border-1 text-text-1 hover:bg-background-2'
              >
                My projects
              </Button>
              <UserMenu withText={false} />
            </div>
          </SignedIn>
        </div>
      </header>
      <section className='flex flex-col items-center justify-center text-center my-5 py-10 px-8 md:py-24 md:px-16 lg:py-40 lg:px-64'>
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
          <Button
            size='xs'
            className='group px-4 bg-background-1 border border-border-1 text-text-1 hover:bg-background-2'
          >
            My projects
            <MdArrowRightAlt
              size={18}
              className='translate-x-1 group-hover:translate-x-2 transition-transform  '
            />
          </Button>
        </SignedIn>
      </section>
      <>
        <section className='flex flex-col justify-center items-center gap-4 lg:gap-6 py-16 lg:py-32 border- border-border-light dark:border-border-dark'>
          <h3 className='lg:flex lg:gap-2 text-text-light-2 text-center dark:text-text-dark-2 text-2xl lg:text-3xl'>
            <span className='flex items-center gap-2'>
              <HiOutlineSparkles /> Organize your work &
            </span>
            <span className='bg-gradient-to-b from-orange-400 from-40% to-orange-600 bg-clip-text text-transparent'>
              {' '}
              be more efficient
            </span>
          </h3>
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
            <Button
              size='xs'
              className='group px-4 bg-background-1 border border-border-1 text-text-1 hover:bg-background-2'
            >
              My projects
              <MdArrowRightAlt
                size={18}
                className='translate-x-1 group-hover:translate-x-2 transition-transform  '
              />
            </Button>
          </SignedIn>
        </section>
        <footer className='bg-background-1 border-t border-border-1 p-6 lg:px-48'>
          <Logo />
          <div className='flex items-center justify-between my-2 mb-10 text-2xl'>
            <ul className='flex gap-4'>
              <li className='text-text-2 hover:text-text-1 transition-colors'>
                <Link
                  href='https://github.com/JuaniLlaberia/productivity-app'
                  target='_blank'
                >
                  <FaGithub />
                </Link>
              </li>
              <li className='text-text-2 hover:text-text-1 transition-colors'>
                <Link
                  href='https://www.linkedin.com/in/juan-ignacio-llaberia-241b351b3/'
                  target='_blank'
                >
                  <FaLinkedinIn />
                </Link>
              </li>
            </ul>
          </div>
          <p className='text-text-2 dark:text-text-dark-2 text-sm mt-3 pt-3'>
            Copyright © {new Date().getFullYear()} Productify, Inc. All rights
            reserved.
          </p>
        </footer>
      </>
    </main>
  );
};

export default LandingPage;
