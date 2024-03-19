'use client';

import { signIn } from 'next-auth/react';
import { BsGitlab } from 'react-icons/bs';
import { Button } from '../ui/button';

const GitlabAuthBtn = () => {
  const handleAuth = () => {
    signIn('gitlab');
  };

  return (
    <Button
      className='w-full flex gap-4 bg-background-3 dark:bg-background-1 text-text-1 border border-border-1 active:bg-background-2 hover:bg-background-2 dark:hover:bg-background-2'
      onClick={handleAuth}
    >
      <BsGitlab size={20} />
      Continue with Gitlab
    </Button>
  );
};

export default GitlabAuthBtn;
