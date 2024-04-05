import Link from 'next/link';
import { BsGithub, BsGitlab, BsStackOverflow } from 'react-icons/bs';
import {
  HiOutlineDocument,
  HiOutlineEllipsisVertical,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi2';

import Badge from '@/components/ui/badge';
import ReferenceForm from './reference-form';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Doc } from '../../../../../convex/_generated/dataModel';
import RefCardMenu from './ref-card-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

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
            <Badge color='gray' text={type} />
            {isPinned && <Badge color='blue' text='Pinned' />}
          </div>
        </div>
        <Sheet>
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
            <RefCardMenu
              referenceId={refId}
              isPinned={isPinned}
              projectId={projectId}
            />
          </DropdownMenu>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit reference</SheetTitle>
            </SheetHeader>
            <ReferenceForm
              isEditMode
              prevData={referenceData}
              projectId={projectId}
            />
          </SheetContent>
        </Sheet>
      </Link>
    </li>
  );
};

export default RefCard;
