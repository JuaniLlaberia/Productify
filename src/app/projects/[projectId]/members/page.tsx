import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import MembersTable from './members-table';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Input } from '@/components/ui/input';

const MembersPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <>
      <header className='w-full flex flex-col md:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6'>
        <h1 className='text-xl w-full mb-3 lg:mb-0'>Members</h1>
        <Input
          placeholder='Search by email or name'
          icon={<HiOutlineMagnifyingGlass />}
          className='w-full md:min-w-[400px]'
        />
      </header>
      <MembersTable projectId={params.projectId as Id<'projects'>} />
    </>
  );
};

export default MembersPage;
