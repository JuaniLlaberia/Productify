import { preloadQuery } from 'convex/nextjs';

import NavbarProjects from '../projects/[projectId]/navbar-projects';
import InvitationsList from './invitations-list';
import { getAuthToken } from '@/utils/getAuthToken';
import { api } from '../../../convex/_generated/api';

const InvitationsPage = async () => {
  const token = await getAuthToken();
  const preloadedInvitations = await preloadQuery(
    api.invitations.getUserInvitations,
    {},
    { token }
  );

  return (
    <main>
      <NavbarProjects />
      <header className='p-2 px-3 lg:px-32 my-3'>
        <h1 className='text-2xl text-text-1 font-semibold'>Invitations</h1>
      </header>
      <InvitationsList preloadedInvitations={preloadedInvitations} />
    </main>
  );
};

export default InvitationsPage;
