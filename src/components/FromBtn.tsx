'use client';

import { useFormStatus } from 'react-dom';
import { ClipLoader } from 'react-spinners';
import { ComponentProps } from 'react';
import { useTheme } from 'next-themes';

import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type FormBtnType = {} & ComponentProps<'button'>;

const FormBtn = ({ ...props }: FormBtnType) => {
  const { pending } = useFormStatus();
  const { theme } = useTheme();

  return (
    <Button
      {...props}
      disabled={pending}
      aria-disabled={pending}
      className={cn('flex items-center gap-5', props.className)}
    >
      {pending && (
        <ClipLoader
          size={20}
          color={theme === 'light' ? '#fffafa' : '#1f1c1c'}
        />
      )}{' '}
      <span>{props.children}</span>
    </Button>
  );
};

export default FormBtn;
