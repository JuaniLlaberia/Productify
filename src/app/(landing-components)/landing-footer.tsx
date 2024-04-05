import Link from 'next/link';
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { MdArrowRightAlt } from 'react-icons/md';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

const LandingFooter = () => {
  return (
    <>
      <section className='flex flex-col justify-center items-center gap-4 lg:gap-6 py-24 lg:py-32 border- border-border-light dark:border-border-dark'>
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
  );
};

export default LandingFooter;
