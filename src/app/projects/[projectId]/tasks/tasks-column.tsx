import { HiOutlinePlus } from 'react-icons/hi2';

import Badge from '@/components/ui/badge';
import TaskCard from './task-card';
import { Button } from '@/components/ui/button';
import { Doc, Id } from '../../../../../convex/_generated/dataModel';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import TaskForm from './create-task-form';

type TasksColumnType = {
  status: 'pending' | 'progress' | 'finished';
  tasks: Doc<'tasks'>[];
  projectId: Id<'projects'>;
};

const TasksColumn = ({ status, tasks, projectId }: TasksColumnType) => {
  return (
    <li className='flex flex-col h-full w-full max-w-[425px] '>
      <Sheet>
        <header className='flex justify-between items-center py-2 mr-3 min-w-[325px]'>
          <Badge
            text={status}
            color={
              status === 'pending'
                ? 'red'
                : status === 'progress'
                ? 'blue'
                : 'green'
            }
            decorated
          />
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
            >
              <HiOutlinePlus size={17} />
            </Button>
          </SheetTrigger>
        </header>
        <ul className='flex flex-col gap-2'>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskCard
                taskInfo={task}
                key={task._id}
              />
            ))
          ) : (
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='justify-start min-w-[325px] max-w-[425px] gap-2 text-text-2 px-1'
              >
                <HiOutlinePlus size={15} />
                <span>Add task</span>
              </Button>
            </SheetTrigger>
          )}
        </ul>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>New Task</SheetTitle>
          </SheetHeader>
          <TaskForm
            projectId={projectId}
            prevData={{ status }}
          />
        </SheetContent>
      </Sheet>
    </li>
  );
};

export default TasksColumn;
