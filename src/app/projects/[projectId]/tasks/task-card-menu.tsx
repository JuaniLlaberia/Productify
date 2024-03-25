import {
  HiOutlineArrowRight,
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TaskCardMenu = () => {
  return (
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
        <DropdownMenuItem>
          <HiOutlinePencil className='mr-2 h-4 w-4' />
          <span>Edit task</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <HiOutlineArrowRight className='mr-2 h-4 w-4' />
          <span>Next stage</span>
        </DropdownMenuItem>

        <DropdownMenuItem className='text-text-danger'>
          <HiOutlineTrash className='mr-2 h-4 w-4' />
          <span>Delete task</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskCardMenu;
