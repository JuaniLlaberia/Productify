'use client';

import { HiMiniArrowLongRight, HiOutlineCodeBracket } from 'react-icons/hi2';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'convex/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Id } from '../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { api } from '../../../convex/_generated/api';

type InvitationItemType = {
  projectImg: string;
  projectName: string;
  invitationId: Id<'invitations'>;
};

const InvitationItem = ({
  projectImg,
  projectName,
  invitationId,
}: InvitationItemType) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const joinProject = useMutation(api.invitations.acceptInvitation);
  const rejectProject = useMutation(api.invitations.rejectInvitation);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <li
          onClick={() => setIsOpen(true)}
          className='relative flex items-center w-full gap-3 hover:bg-background-hover-2 p-2 rounded-lg cursor-pointer'
        >
          <Avatar className='rounded-md'>
            <AvatarFallback className='bg-background-2 border border-border-1 rounded-md text-text-2'>
              <HiOutlineCodeBracket size={24} />
            </AvatarFallback>
            <AvatarImage src={projectImg} />
          </Avatar>
          <p className='text-sm'>
            Invitation from <span className='font-medium'>{projectName}</span>
          </p>
          <p className='absolute right-1.5 text-text-2 font-semibold'>
            <HiMiniArrowLongRight size={15} />
          </p>
        </li>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span>
              Invitations from{' '}
              <span className='font-medium'>{projectName}</span>
            </span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-text-2'>
          You have been invited to be a member of{' '}
          <span className='text-text-1 font-medium'>{projectName}</span>. This
          invitation expires after 24h. Join or reject the invitation below.
        </DialogDescription>
        <div className='flex justify-between items-center mt-3'>
          <Button
            onClick={async () => {
              try {
                await rejectProject({ invitationId });
                toast.success('You have declined the invitation');
              } catch (err) {
                toast.error('Failed to decline invitation');
              } finally {
                setIsOpen(false);
              }
            }}
            variant='destructive'
            size='sm'
          >
            Reject invitation
          </Button>
          <Button
            isLoading={isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);
                const projectId = await joinProject({ invitationId });
                router.push(`/projects/${projectId}/tasks`);
                toast.success('You have joined successfully');
              } catch (err) {
                toast.error('Failed to join project');
              } finally {
                setIsLoading(false);
                setIsOpen(false);
              }
            }}
            size='sm'
          >
            Join project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationItem;
