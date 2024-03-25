import {
  HiOutlineArrowRight,
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';

import Badge from '@/components/ui/badge';
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
import TaskForm from './task-form';
import TaskCardMenu from './task-card-menu';

const TaskCard = ({ taskInfo }: { taskInfo: Doc<'tasks'> }) => {
  const { title, description, importance, tag, projectId } = taskInfo;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <li className='relative bg-background-1 min-w-[325px] max-w-[410px] p-3 mr-3 border border-border-1 rounded-lg shadow-md md:cursor-pointer'>
          <h3 className='text-text-1'>{title}</h3>
          <p className='text-text-2 text-sm'>{description}</p>
          <div className='flex mt-6 px-2'>
            <Badge
              text={tag}
              color='purple'
            />
            <Badge
              text={importance}
              color='gray'
            />
          </div>
          <TaskCardMenu />
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
