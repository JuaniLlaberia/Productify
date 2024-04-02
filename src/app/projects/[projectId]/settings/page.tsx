import ProjectSettingsCards from './project-settings-cards';
import { Id } from '../../../../../convex/_generated/dataModel';

const ProjectSettingsPage = async ({
  params,
}: {
  params: { projectId: Id<'projects'> };
}) => {
  return (
    <>
      <h1 className='w-full text-text-1 text-xl mb-4'>Project Settings</h1>
      <ProjectSettingsCards projectId={params.projectId} />
    </>
  );
};

export default ProjectSettingsPage;
