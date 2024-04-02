import { HiOutlinePlus } from 'react-icons/hi2';

import BugsTable from './bugs-table';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import ReportsForm from './reports-form';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const BugsReportPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <>
      <header className='w-full flex items-center justify-between mb-6'>
        <h1 className='text-xl'>Bugs reports</h1>
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
              <SheetTitle>New Bug Report</SheetTitle>
            </SheetHeader>
            <ReportsForm projectId={params.projectId as Id<'projects'>} />
          </SheetContent>
        </Sheet>
      </header>
      <BugsTable projectId={params.projectId as Id<'projects'>} />
    </>
  );
};

export default BugsReportPage;
