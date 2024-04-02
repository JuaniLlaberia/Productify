import {
  HiOutlineCodeBracket,
  HiOutlineCog6Tooth,
  HiOutlineEllipsisVertical,
} from 'react-icons/hi2';
import Link from 'next/link';

import Badge from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Doc } from '../../../convex/_generated/dataModel';
import { formatDateDistance } from '@/utils/formatDate';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type ExtendedDoc = Doc<'projects'> & {
  role: 'owner' | 'admin' | 'member';
};

type PageItemType = {
  project: ExtendedDoc;
};

const ProjectItem = ({ project }: PageItemType) => {
  const { _id, updatedAt, name, status, role, image } = project;

  return (
    <li>
      <Link
        href={`/projects/${_id}/dashboard`}
        className='relative w-full flex items-start gap-4 bg-background-1 p-4 rounded-lg shadow-sm border border-border-1'
      >
        <Avatar className='rounded-md'>
          <AvatarFallback className='bg-background-2 border border-border-1 rounded-md text-text-2'>
            <HiOutlineCodeBracket size={24} />
          </AvatarFallback>
          <AvatarImage src={image} />
        </Avatar>
        <div>
          <h2 className='font-semibold text-text-1'>{name}</h2>
          <div className='flex items-center mt-1.5 mb-3'>
            <Badge
              text={role}
              color={role === 'owner' ? 'red' : 'gray'}
            />
            <Badge
              text={status}
              color={
                status === 'active'
                  ? 'green'
                  : status === 'inactive'
                  ? 'blue'
                  : 'red'
              }
              decorated
            />
          </div>
          <p className='text-text-2 text-sm'>
            Last updated {formatDateDistance(new Date(updatedAt || 0))}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='absolute top-2 right-2 text-text-2'
              size='icon'
              variant='ghost'
            >
              <HiOutlineEllipsisVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/projects/${_id}/settings`}>
              <DropdownMenuItem>
                <HiOutlineCog6Tooth className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </Link>
    </li>
  );
};

export default ProjectItem;
