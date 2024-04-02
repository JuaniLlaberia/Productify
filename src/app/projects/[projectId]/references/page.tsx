import { HiOutlinePlus } from 'react-icons/hi2';

import ReferenceForm from './reference-form';
import RefsList from './refs-list';
import { Button } from '@/components/ui/button';
import { Id } from '../../../../../convex/_generated/dataModel';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const ReferencesPage = ({
  params,
}: {
  params: { projectId: Id<'projects'> };
}) => {
  return (
    <>
      <header className='w-full flex items-center justify-between mb-2'>
        <h1 className='w-full text-xl'>References</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='sm'>
              <HiOutlinePlus
                className='mr-2'
                size={16}
              />
              Add New
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>New Reference</SheetTitle>
            </SheetHeader>
            <ReferenceForm projectId={params.projectId} />
          </SheetContent>
        </Sheet>
      </header>
      <RefsList projectId={params.projectId} />
    </>
  );
};

export default ReferencesPage;
