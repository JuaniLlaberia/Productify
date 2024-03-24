import { Id } from '../../../../../convex/_generated/dataModel';
import MembersTable from './members-table';

const MembersPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <>
      <h1 className='text-xl w-full'>Members</h1>
      <MembersTable
        projectId={params.projectId as Id<'projects'>}
        userEmail='juanillaberia2002@gmail.com'
      />
    </>
  );
};

export default MembersPage;
