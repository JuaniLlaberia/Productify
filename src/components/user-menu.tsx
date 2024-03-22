'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useQuery } from 'convex/react';
import {
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineFolder,
} from 'react-icons/hi2';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { api } from '../../convex/_generated/api';
import { Skeleton } from './ui/skeleton';
import ThemeMenu from './theme-menu';

type UserMenuType = {
  email: string;
  withText?: boolean;
};

const UserMenu = ({ email, withText = true }: UserMenuType) => {
  const userData = useQuery(api.users.getUserByEmail, { email });

  if (!userData)
    return <Skeleton className={`${withText ? 'w-full h-12' : ''}`} />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2.5 hover:bg-background-hover-2 p-1 rounded-lg transition-colors'>
        <Avatar className={`${!withText ? 'size-8' : ''}`}>
          <AvatarImage src={userData?.profileImg} />
          <AvatarFallback>{userData?.name.at(0)}</AvatarFallback>
        </Avatar>
        {withText && (
          <div className='text-start'>
            <h3 className='text-sm text-text-1'>{userData?.name}</h3>
            <p className='text-xs text-text-2'>{userData?.email}</p>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent isProfile>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href='/projects'>
          <DropdownMenuItem>
            <HiOutlineFolder className='mr-2 h-4 w-4' />
            <span>Projects</span>
          </DropdownMenuItem>
        </Link>
        <ThemeMenu />
        <Link href='/account'>
          <DropdownMenuItem>
            <HiOutlineCog6Tooth className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <HiOutlineArrowRightOnRectangle className='mr-2 h-4 w-4' />
          <button
            onClick={() => {
              signOut({ callbackUrl: 'http://localhost:3000' });
            }}
          >
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;