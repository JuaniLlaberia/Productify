import TaskForm from './task-form';
import TaskCardMenu from './task-card-menu';
import Badge from '@/components/ui/badge';
import { Doc } from '../../../../../convex/_generated/dataModel';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const TaskCard = ({ taskInfo }: { taskInfo: Doc<'tasks'> }) => {
  const {
    _id: taskId,
    title,
    description,
    importance,
    tag,
    projectId,
  } = taskInfo;

  return (
    <li className='relative bg-background-1 min-w-[325px] max-w-[410px] mr-3 border border-border-1 rounded-lg shadow-md md:cursor-pointer'>
      <Sheet>
        <SheetTrigger className='text-start w-full p-3'>
          <>
            <h3 className='text-text-1'>{title}</h3>
            <p className='text-text-2 text-sm mt-1.5'>{description}</p>
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
          </>
        </SheetTrigger>
        <TaskCardMenu
          taskId={taskId}
          projectId={projectId}
        />
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
    </li>
  );
};

export default TaskCard;
