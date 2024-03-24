import { getServerSession } from 'next-auth';

import ProjectSettingsCards from './project-settings-cards';
import { Id } from '../../../../../convex/_generated/dataModel';

const ProjectSettingsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const session = await getServerSession();
  return (
    <>
      <h1 className='w-full text-text-1 text-xl mb-4'>Project Settings</h1>
      <ProjectSettingsCards
        projectId={params.projectId as Id<'projects'>}
        userEmail={session?.user?.email!}
      />
    </>
  );
};

export default ProjectSettingsPage;
