'use client';

import { Preloaded, usePreloadedQuery } from 'convex/react';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import InvitationItem from './invitations-item';
import { api } from '../../../convex/_generated/api';

const InvitationsList = (props: {
  preloadedInvitations: Preloaded<typeof api.invitations.getUserInvitations>;
}) => {
  const invitations = usePreloadedQuery(props.preloadedInvitations);

  return (
    <>
      {invitations.length > 0 ? (
        <ul className='px-2'>
          {invitations.map(invitation => (
            <InvitationItem
              invitationId={invitation.invitationId}
              projectImg={invitation.projectImg}
              projectName={invitation.projectName}
            />
          ))}
        </ul>
      ) : (
        <section className='flex items-center justify-center flex-col mx-3 lg:mx-32 gap-1 bg-background-1 p-1 rounded-lg min-h-[450px]'>
          <span className='p-3 bg-background-hover-2 text-text-2 rounded-full mb-2'>
            <HiOutlineEnvelope size={25} />
          </span>
          <h2 className='text-text-2'>No invitations available</h2>
        </section>
      )}
    </>
  );
};

export default InvitationsList;
