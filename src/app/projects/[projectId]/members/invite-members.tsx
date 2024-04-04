'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import Error from '@/components/ui/error-form';
import { Button } from '@/components/ui/button';
import { Id } from '../../../../../convex/_generated/dataModel';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InvitationSchema } from '@/lib/schemas';
import { api } from '../../../../../convex/_generated/api';

const InviteMembers = ({ projectId }: { projectId: Id<'projects'> }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(InvitationSchema),
  });

  const inviteUser = useMutation(api.invitations.createInvitation);

  const submit = handleSubmit(async data => {
    try {
      await inviteUser({ projectId, userEmail: data.email });
      toast.success('Invitation sent successfully');
      reset();
    } catch (err) {
      console.log(err);
      toast.error('Failed to send invitation');
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>Invite member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite new member</DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-text-2'>
          Invite users to your project, send them an invitation.
        </DialogDescription>
        <form onSubmit={submit}>
          <Label>User email</Label>
          <Input
            {...register('email')}
            placeholder='example@email.com'
            type='email'
          />
          <Error error={errors.email?.message as string} />
          <div className='flex items-center justify-between mt-4'>
            <DialogClose asChild>
              <Button
                variant='ghost'
                size='sm'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              isLoading={isSubmitting}
              size='sm'
            >
              Send invitation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembers;
