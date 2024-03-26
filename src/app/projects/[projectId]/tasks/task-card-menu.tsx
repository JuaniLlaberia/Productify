import {
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';

import FormBtn from '@/components/form-btn';
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
import { deleteTask } from '@/lib/actions/tasks-actions';
import { Id } from '../../../../../convex/_generated/dataModel';

type CardMenuType = {
  projectId: Id<'projects'>;
  taskId: Id<'tasks'>;
};

const TaskCardMenu = ({ projectId, taskId }: CardMenuType) => {
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
          <form action={() => deleteTask(projectId, taskId)}>
            <FormBtn
              dangerMode
              size='sm'
            >
              Confirm
            </FormBtn>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskCardMenu;