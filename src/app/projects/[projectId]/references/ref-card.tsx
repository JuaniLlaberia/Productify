import Link from 'next/link';
import { BsGithub, BsGitlab, BsStackOverflow } from 'react-icons/bs';
import {
  HiOutlineDocument,
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineQuestionMarkCircle,
  HiOutlineStar,
  HiOutlineTrash,
} from 'react-icons/hi2';

import Badge from '@/components/ui/badge';
import ReferenceForm from './reference-form';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Doc } from '../../../../../convex/_generated/dataModel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteReference } from '@/lib/actions/references-actions';

const iconGenerator = (
  type: 'github' | 'gitlab' | 'stackoverflow' | 'documentation' | 'other'
) => {
  switch (type) {
    case 'github':
      return <BsGithub />;
    case 'gitlab':
      return <BsGitlab />;
    case 'stackoverflow':
      return <BsStackOverflow />;
    case 'documentation':
      return <HiOutlineDocument />;
    default:
      return <HiOutlineQuestionMarkCircle />;
  }
};

const RefCard = ({ referenceData }: { referenceData: Doc<'references'> }) => {
  const {
    _id: refId,
    projectId,
    name,
    type,
    reference,
    isPinned,
  } = referenceData;

  const action = deleteReference.bind(null, { projectId, refId });

  return (
    <li>
      <Link
        href={reference}
        passHref={true}
        target='_blank'
        className='relative flex items-start gap-4 p-4 bg-background-1 border border-border-1 rounded-lg'
      >
        <span className='text-2xl'>{iconGenerator(type)}</span>
        <div className='flex flex-col items-start'>
          <h3 className='mb-3 font-medium'>{name}</h3>
          <div className='flex items-center gap-1'>
            <Badge
              color='gray'
              text={type}
            />
            {isPinned && (
              <Badge
                color='blue'
                text='Pinned'
              />
            )}
          </div>
        </div>
        <Dialog>
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
              <DropdownMenuItem>
                <form action={action}>
                  <button className='flex'>
                    <HiOutlineStar className='mr-2 h-4 w-4' />
                    <span>Pin to top</span>
                  </button>
                </form>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DialogTrigger className='w-full'>
                  <HiOutlinePencil className='mr-2 h-4 w-4' />
                  <span>Edit reference</span>
                </DialogTrigger>
              </DropdownMenuItem>

              <DropdownMenuItem className='text-text-danger'>
                <form action={action}>
                  <button className='flex'>
                    <HiOutlineTrash className='mr-2 h-4 w-4' />
                    <span>Delete reference</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit reference</DialogTitle>
            </DialogHeader>
            <ReferenceForm
              isEditMode
              prevData={referenceData}
              projectId={projectId}
            />
          </DialogContent>
        </Dialog>
      </Link>
    </li>
  );
};

export default RefCard;
