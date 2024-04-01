'use client';

import { useQuery } from 'convex/react';
import {
  HiOutlineBellAlert,
  HiOutlineEnvelope,
  HiOutlineListBullet,
} from 'react-icons/hi2';

import { api } from '../../../convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';

const NotificationsList = () => {
  const notifications = useQuery(api.notifications.getNotificaions);

  if (!notifications) return <Skeleton className='h-[500px] m-3' />;

  return (
    <>
      {notifications?.length > 0 ? (
        <ul className='flex flex-col gap-1 bg-background-1 m-3 p-1 rounded-lg min-h-[500px]'>
          {notifications?.map(notification => (
            <li className='relative flex items-center w-full gap-3 hover:bg-background-hover-2 p-2 rounded-lg cursor-pointer'>
              <p className='flex items-center text-text-2 justify-center text-2xl bg-background-2 p-3 rounded-full'>
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
                <span className='font-medium'>{notification.projectName}</span>
              </p>
              <div className='absolute right-3 p-1 bg-special rounded-full'></div>
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex flex-col items-center justify-center gap-1 bg-background-1 m-3 p-1 rounded-lg min-h-[500px]'>
          <span className='p-3 bg-background-hover-2 text-text-2 rounded-full mb-2'>
            <HiOutlineBellAlert size={25} />
          </span>
          <h2 className='text-text-2'>No new notifications</h2>
        </div>
      )}
    </>
  );
};

export default NotificationsList;
