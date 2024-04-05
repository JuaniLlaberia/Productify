import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            `flex h-10 my-2 w-full rounded-md border border-border-1 bg-transparent px-3 ${
              icon ? 'pl-9' : ''
            } py-2 text-sm file:border-0 file:font-medium placeholder:text-text-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background-contrast focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
        <span className='absolute top-[50%] translate-y-[-50%] left-2 text-xl text-text-2'>
          {icon}
        </span>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
