'use client';

import { signIn } from 'next-auth/react';
import { BsGithub } from 'react-icons/bs';
import { Button } from '../ui/button';

const GithubAuthBtn = () => {
  const handleAuth = () => {
    signIn('github', {
      redirect: true,
      callbackUrl: 'http://localhost:3000/projects',
    });
  };

  return (
    <Button
      className='w-full flex gap-4 bg-background-3 dark:bg-background-1 text-text-1 border border-border-1 active:bg-background-2 hover:bg-background-2 dark:hover:bg-background-2'
      onClick={handleAuth}
    >
      <BsGithub size={20} />
      Continue with Github
    </Button>
  );
};

export default GithubAuthBtn;
