import Link from 'next/link';
import { fetchQuery } from 'convex/nextjs';
import { HiOutlineFolder, HiOutlinePlus } from 'react-icons/hi2';

import NavbarProjects from '@/app/projects/[projectId]/navbar-projects';
import ProjectItem, { ExtendedDoc } from '@/app/projects/project-item';
import { api } from '../../../convex/_generated/api';
import { getAuthToken } from '@/utils/getAuthToken';

const ProjectsPage = async () => {
  const token = await getAuthToken();
  const projects = await fetchQuery(
    api.projects.getUserProjects,
    {},
    { token }
  );

  return (
    <main className='px-2'>
      <NavbarProjects />
      <header className='flex items-center justify-between p-2 px-3 lg:px-24 my-3'>
        <h1 className='text-2xl text-text-1 font-semibold'>
          Projects {projects.length > 0 ? `(${projects?.length})` : ''}
        </h1>
        <Link
          href='/projects/new'
          className='flex items-center h-9 rounded-md px-4 hover:bg-background-hover-2 text-text-1'
        >
          <HiOutlinePlus size={22} />
          <span className='ml-3'>New project</span>
        </Link>
      </header>
      <section className='lg:px-24'>
        {projects.length > 0 ? (
          <ul className='flex flex-col gap-2 w-full mt-3 lg:grid lg:grid-cols-3 lg:gap-4'>
            {projects.map(project => (
              <ProjectItem key={project._id} project={project as ExtendedDoc} />
            ))}
          </ul>
        ) : (
          <p className='flex items-center justify-center gap-3 text-sm text-text-2 my-16'>
            <HiOutlineFolder size={20} /> No projects found
          </p>
        )}
      </section>
    </main>
  );
};

export default ProjectsPage;
