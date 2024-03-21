import { HiOutlineEllipsisVertical } from 'react-icons/hi2';

import Badge from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Doc } from '../../../../../convex/_generated/dataModel';

const TaskCard = ({ taskInfo }: { taskInfo: Doc<'tasks'> }) => {
  const { _id, title, description, importance, tag, assignedTo } = taskInfo;

  return (
    <li className='relative bg-background-1 min-w-[325px] max-w-[410px] p-3 border border-border-1 rounded-lg shadow-md md:cursor-pointer'>
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
      <button className='absolute top-2 right-2 text-text-2'>
        <HiOutlineEllipsisVertical size={20} />
      </button>
    </li>
  );
};

export default TaskCard;
