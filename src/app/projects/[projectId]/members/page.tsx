import MembersTable from './members-table';
import InviteMembers from './invite-members';
import { Id } from '../../../../../convex/_generated/dataModel';

const MembersPage = ({ params }: { params: { projectId: Id<'projects'> } }) => {
  return (
    <>
      <header className='w-full flex items-center justify-between mb-4 lg:mb-8'>
        <h1 className='text-xl w-full'>Members</h1>
        <InviteMembers projectId={params.projectId} />
      </header>
      <MembersTable projectId={params.projectId} />
    </>
  );
};

export default MembersPage;
