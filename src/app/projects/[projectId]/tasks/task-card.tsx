import { HiOutlineEllipsisVertical } from 'react-icons/hi2';

import Badge from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Doc } from '../../../../../convex/_generated/dataModel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import TaskForm from './create-task-form';

const TaskCard = ({ taskInfo }: { taskInfo: Doc<'tasks'> }) => {
  const { _id, title, description, importance, tag, assignedTo, projectId } =
    taskInfo;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <li className='relative bg-background-1 min-w-[325px] max-w-[410px] p-3 mr-3 border border-border-1 rounded-lg shadow-md md:cursor-pointer'>
          <h3 className='text-text-1'>{title}</h3>
          <p className='text-text-2 text-sm'>{description}</p>
          <div className='flex mt-6 justify-between px-2'>
            <div className='flex'>
              <Badge
                text={tag}
                color='purple'
              />
              <Badge
                text={importance}
                color='gray'
              />
            </div>
            <Avatar className='size-6 text-sm'>
              <AvatarFallback>J</AvatarFallback>
              <AvatarImage src='' />
            </Avatar>
          </div>
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
            <DropdownMenuContent></DropdownMenuContent>
          </DropdownMenu>
        </li>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
        </SheetHeader>
        <TaskForm
          projectId={projectId}
          prevData={taskInfo}
          editMode
        />
      </SheetContent>
    </Sheet>
  );
};

export default TaskCard;
