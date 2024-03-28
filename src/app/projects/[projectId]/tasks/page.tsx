import { HiOutlinePlus } from 'react-icons/hi2';

import TasksBoard from './tasks-board';
import TaskForm from './task-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Id } from '../../../../../convex/_generated/dataModel';

export const TasksPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  return (
    <>
      <header className='w-full flex items-center justify-between sticky left-0 mb-4'>
        <h1 className='text-xl'>Tasks</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
            >
              <HiOutlinePlus
                className='mr-2'
                size={17}
              />
              New task
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>New Task</SheetTitle>
            </SheetHeader>
            <TaskForm projectId={params.projectId as Id<'projects'>} />
          </SheetContent>
        </Sheet>
      </header>
      <TasksBoard projectId={params.projectId as Id<'projects'>} />
    </>
  );
};

export default TasksPage;
