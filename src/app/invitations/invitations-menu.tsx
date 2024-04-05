'use client';

import Link from 'next/link';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { useQuery } from 'convex/react';

import InvitationItem from './invitations-item';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { api } from '../../../convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';

const InvitationsMenu = () => {
  const invitations = useQuery(api.invitations.getUserInvitations);

  if (!invitations) return <Skeleton className='size-8 rounded-md' />;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='flex items-center justify-start gap-2 text-text-2 hover:text-text-1 px-2'
          variant='ghost'
          size='sm'
          aria-label='invitations menu'
        >
          <span className='text-2xl relative'>
            <HiOutlineEnvelope />
            {invitations.length > 0 ? (
              <div className='absolute top-0 right-0 size-2 bg-special rounded-full'></div>
            ) : null}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <header className='flex items-center justify-between mb-4'>
          <h3 className='font-semibold'>Invitations ({invitations?.length})</h3>
          <Link
            href='/invitations'
            className='text-special text-sm hover:underline'
          >
            View All
          </Link>
        </header>
        <ul className='flex flex-col gap-1'>
          {invitations?.length > 0 ? (
            <>
              {invitations?.map(invitation => (
                <InvitationItem
                  key={invitation.invitationId}
                  projectImg={invitation.projectImg}
                  projectName={invitation.projectName}
                  invitationId={invitation.invitationId}
                />
              ))}
            </>
          ) : (
            <p className='text-center text-text-2 text-sm py-4'>
              You have 0 invitations
            </p>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default InvitationsMenu;
