'use client';

import Link from 'next/link';
import {
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineListBullet,
} from 'react-icons/hi2';
import { useQuery } from 'convex/react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { api } from '../../../convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';

type NotificationMenuType = {
  withText: boolean;
};

const NotificationsMenu = ({ withText }: NotificationMenuType) => {
  const notifications = useQuery(api.notifications.getNotificaions);

  if (!notifications) return <Skeleton className='size-8 rounded-md' />;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`flex items-center justify-start gap-2 text-text-2 hover:text-text-1 px-2 ${
            withText ? 'py-5' : ''
          }`}
          variant='ghost'
          size='sm'
        >
          <span className='text-2xl'>
            <HiOutlineBell />
          </span>
          {withText && <span>Notifications</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <header className='flex items-center justify-between mb-4'>
          <h3 className='font-semibold'>
            Notifications ({notifications?.length})
          </h3>
          <Link
            href='/notifications'
            className='text-special text-sm hover:underline'
          >
            View All
          </Link>
        </header>
        <ul className='flex flex-col gap-1'>
          {notifications?.length > 0 ? (
            <>
              {notifications?.map(notification => (
                <li className='flex items-center w-full gap-3 hover:bg-background-hover-2 p-1 px-2 rounded-lg cursor-pointer'>
                  <p className='flex items-center text-text-2 justify-center text-2xl bg-background-1 p-3 rounded-full'>
                    {notification.type === 'invitation' ? (
                      <HiOutlineEnvelope />
                    ) : (
                      <HiOutlineListBullet />
                    )}
                  </p>
                  <p className='text-sm'>
                    {notification.type === 'invitation'
                      ? 'You have been invited to'
                      : 'You have new tasks in'}
                    :{' '}
                    <span className='font-medium'>
                      {notification.projectName}
                    </span>
                  </p>
                  <div className='p-1 bg-special rounded-full'></div>
                </li>
              ))}
            </>
          ) : (
            <p className='text-center text-text-2 text-sm py-4'>
              No notifications
            </p>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu;
