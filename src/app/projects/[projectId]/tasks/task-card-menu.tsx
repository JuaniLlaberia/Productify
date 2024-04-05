'use client';

import {
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { SheetTrigger } from '@/components/ui/sheet';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';

type CardMenuType = {
  projectId: Id<'projects'>;
  taskId: Id<'tasks'>;
};

const TaskCardMenu = ({ projectId, taskId }: CardMenuType) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteTask = useMutation(api.tasks.deleteTask);

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-2 right-2 text-text-2 z-40'
          >
            <HiOutlineEllipsisVertical size={20} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <SheetTrigger className='w-full'>
              <>
                <HiOutlinePencil className='mr-2 h-4 w-4' />
                <span>Edit task</span>
              </>
            </SheetTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-text-danger'
            asChild
          >
            <AlertDialogTrigger className='w-full'>
              <>
                <HiOutlineTrash className='mr-2 h-4 w-4' />
                <span>Delete task</span>
              </>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader className='text-start'>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription className='text-text-2'>
            This will permanently remove this task.
            <span className='text-text-1 font-semibold'>
              This action is not reversible.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
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
            isLoading={isLoading}
            variant='destructive'
            size='sm'
            onClick={async () => {
              try {
                setIsLoading(true);
                await deleteTask({ projectId, taskId });
                toast.success('Task deleted');
              } catch (err) {
                toast.error('Failed to delete task');
              } finally {
                setIsLoading(false);
              }
            }}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskCardMenu;
