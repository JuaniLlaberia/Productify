'use client';

import { useMutation, useQuery } from 'convex/react';
import {
  HiOutlineEllipsisVertical,
  HiOutlineSparkles,
  HiOutlineTrash,
} from 'react-icons/hi2';

import Badge from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Doc, Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';

type MemberRowType = {
  member: Doc<'users'> & { role: 'owner' | 'admin' | 'member' };
  projectId: Id<'projects'>;
};

const MemberRow = ({ member, projectId }: MemberRowType) => {
  const userRole = useQuery(api.projects.getUserRole, { projectId });
  const deleteMember = useMutation(api.projects.removeMember);
  const toggleAdmin = useMutation(api.projects.updateRole);

  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarFallback></AvatarFallback>
          <AvatarImage src={member.profileImg} />
        </Avatar>
      </TableCell>
      <TableCell className='w-[150px] lg:w-[200px]'>{member.name}</TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell className='text-right'>
        <div className='flex'>
          <Badge
            text={member.role as string}
            color={`${member.role === 'member' ? 'blue' : 'red'}`}
          />
        </div>
      </TableCell>
      <TableCell className='flex justify-end mt-1'>
        {member.role !== 'owner' && userRole !== 'member' ? (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                >
                  <HiOutlineEllipsisVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    toggleAdmin({
                      projectId,
                      userId: member._id,
                      role: member.role === 'admin' ? 'member' : 'admin',
                    })
                  }
                >
                  <HiOutlineSparkles className='mr-2 h-4 w-4' />
                  <span>
                    {member.role === 'admin' ? 'Make member' : 'Make admin'}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-text-danger'
                  asChild
                >
                  <AlertDialogTrigger className='w-full'>
                    <>
                      <HiOutlineTrash className='mr-2 h-4 w-4' />
                      <span>Remove member</span>
                    </>
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogTitle>Remove Member</AlertDialogTitle>
              <AlertDialogDescription className='text-text-2'>
                Are you sure you want to remove this member?{' '}
                <span className='text-text-1 font-semibold'>
                  It can re-join the project again.
                </span>
              </AlertDialogDescription>
              <AlertDialogFooter className='flex flex-row justify-between'>
                <AlertDialogCancel asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                  >
                    Cancel
                  </Button>
                </AlertDialogCancel>

                <Button
                  size='sm'
                  variant='destructive'
                  onClick={() =>
                    deleteMember({ projectId, userId: member._id })
                  }
                >
                  Confirm
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default MemberRow;
