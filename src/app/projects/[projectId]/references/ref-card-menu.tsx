'use client';

import {
  HiOutlinePencil,
  HiOutlineStar,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useMutation } from 'convex/react';

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';

const RefCardMenu = ({
  referenceId,
  projectId,
  isPinned,
}: {
  referenceId: Id<'references'>;
  projectId: Id<'projects'>;
  isPinned: boolean;
}) => {
  const deleteReference = useMutation(api.references.deleteReference);
  const pinReference = useMutation(api.references.togglePin);

  return (
    <AlertDialog>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            pinReference({ projectId, referenceId, value: !isPinned })
          }
        >
          <HiOutlineStar className='mr-2 h-4 w-4' />
          <span>Pin to top</span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <SheetTrigger className='w-full'>
            <HiOutlinePencil className='mr-2 h-4 w-4' />
            <span>Edit reference</span>
          </SheetTrigger>
        </DropdownMenuItem>

        <DropdownMenuItem className='text-text-danger' asChild>
          <AlertDialogTrigger className='w-full'>
            <>
              <HiOutlineTrash className='mr-2 h-4 w-4' />
              <span>Delete reference</span>
            </>
          </AlertDialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <AlertDialogContent>
        <AlertDialogHeader className='text-start'>
          <AlertDialogTitle>Delete Reference</AlertDialogTitle>
          <AlertDialogDescription className='text-text-2'>
            This will permanently remove this reference.
            <span className='text-text-1 font-semibold'>
              This action is not reversible.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-row justify-between'>
          <AlertDialogCancel asChild>
            <Button variant='ghost' size='sm'>
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => deleteReference({ projectId, referenceId })}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RefCardMenu;
