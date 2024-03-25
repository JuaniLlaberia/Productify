import { HiOutlineMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2';

import RefsList from './refs-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ReferenceForm from './reference-form';
import { Id } from '../../../../../convex/_generated/dataModel';

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
        <Dialog>
          <DialogTrigger asChild>
            <Button size='sm'>
              <HiOutlinePlus
                className='mr-2'
                size={16}
              />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Reference</DialogTitle>
            </DialogHeader>
            <ReferenceForm projectId={params.projectId as Id<'projects'>} />
          </DialogContent>
        </Dialog>
      </header>
      <RefsList projectId={params.projectId} />
    </>
  );
};

export default ReferencesPage;
