'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

type NavLinkType = {
  to: string;
  icon?: ReactElement;
  children: string;
  hasNotification: boolean;
  closeFn?: () => void;
};

const NavLink = ({
  to,
  icon,
  hasNotification,
  children,
  closeFn,
}: NavLinkType) => {
  const pathname = usePathname();

  const condition = `/${pathname.split('/').at(-1)}` === `/${to}`;
  return (
    <li>
      <Link
        onClick={closeFn}
        className={`relative flex items-center gap-2 p-2 w-full hover:bg-background-hover-2 rounded-lg transition-colors
        ${condition ? 'bg-background-hover-2' : 'bg-transparent'}
        ${condition || hasNotification ? 'text-text-1' : 'text-text-2'}
      `}
        href={to}
      >
        <span className='text-xl'>{icon}</span>
        <span>{children}</span>
        {hasNotification && `/${pathname.split('/').at(-1)}` !== `/chat` && (
          <div className='absolute right-2 size-2 bg-background-contrast rounded-full'></div>
        )}
      </Link>
    </li>
  );
};

export default NavLink;
