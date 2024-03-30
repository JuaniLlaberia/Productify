import { HiOutlineMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2';

import ReferenceForm from './reference-form';
import RefsList from './refs-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Id } from '../../../../../convex/_generated/dataModel';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const ReferencesPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <>
      <h1 className='w-full text-xl mb-4'>References</h1>
      <header className='w-full flex items-center justify-between gap-3'>
        <form className='flex items-center'>
          <Input
            placeholder='Search reference'
            icon={<HiOutlineMagnifyingGlass />}
          />
        </form>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='sm'>
              <HiOutlinePlus className='mr-2' size={16} />
              Add
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>New Reference</SheetTitle>
            </SheetHeader>
            <ReferenceForm projectId={params.projectId as Id<'projects'>} />
          </SheetContent>
        </Sheet>
      </header>
      <RefsList projectId={params.projectId} />
    </>
  );
};

export default ReferencesPage;
