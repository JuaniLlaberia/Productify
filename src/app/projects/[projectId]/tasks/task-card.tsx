import TaskForm from './task-form';
import TaskCardMenu from './task-card-menu';
import Badge, { ColorsType } from '@/components/ui/badge';
import { Doc } from '../../../../../convex/_generated/dataModel';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const priorityColor = (
  priority: 'p-0' | 'p-1' | 'p-2' | 'p-3' | 'p-4'
): ColorsType => {
  switch (priority) {
    case 'p-0':
      return 'red';
    case 'p-1':
      return 'orange';
    case 'p-2':
      return 'yellow';
    case 'p-3':
    case 'p-4':
    default:
      return 'gray';
  }
};

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
    <li className='relative bg-background-2 dark:bg-background-1 min-w-[325px] max-w-[410px] mr-3 border border-border-1 rounded-lg shadow-md md:cursor-pointer'>
      <Sheet>
        <SheetTrigger className='text-start w-full p-3'>
          <>
            <h3 className='text-text-1'>{title}</h3>
            <p className='text-text-2 text-sm mt-1.5 line-clamp-3'>
              {description}
            </p>
            <div className='flex mt-6 px-2'>
              <Badge
                text={tag}
                color='purple'
              />
              <Badge
                text={importance}
                color={priorityColor(importance)}
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
