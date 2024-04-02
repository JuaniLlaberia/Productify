import MembersTable from './members-table';
import { Id } from '../../../../../convex/_generated/dataModel';

const MembersPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <>
      <h1 className='text-xl w-full mb-4 lg:mb-8'>Members</h1>
      <MembersTable projectId={params.projectId as Id<'projects'>} />
    </>
  );
};

export default MembersPage;
