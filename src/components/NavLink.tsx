'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

type NavLinkType = {
  to: string;
  icon?: ReactElement;
  children: string;
};

const NavLink = ({ to, icon, children }: NavLinkType) => {
  const pathname = usePathname();

  console.log(`/${pathname.split('/').at(-1)}`, to);

  return (
    <Link
      className={`flex items-center gap-2 p-2 w-full hover:bg-background-hover-2 rounded-lg transition-colors
        ${
          `/${pathname.split('/').at(-1)}` === `/${to}`
            ? 'bg-background-hover-2 text-text-1'
            : 'text-text-2 bg-transparent'
        } 
      `}
      href={to}
    >
      <span className='text-xl'>{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

export default NavLink;
