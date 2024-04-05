import Link from 'next/link';
import { preloadQuery } from 'convex/nextjs';
import { HiOutlinePlus } from 'react-icons/hi2';

import NavbarProjects from '@/app/projects/[projectId]/navbar-projects';
import ProjectsList from './project-list';
import { api } from '../../../convex/_generated/api';
import { getAuthToken } from '@/utils/getAuthToken';

const ProjectsPage = async () => {
  const token = await getAuthToken();
  const preloadedProjects = await preloadQuery(
    api.projects.getUserProjects,
    {},
    { token }
  );

  return (
    <main className='px-2'>
      <NavbarProjects />
      <header className='flex items-center justify-between p-2 px-3 lg:px-32 my-3'>
        <h1 className='text-2xl text-text-1 font-semibold'>Projects</h1>
        <Link
          href='/projects/new'
          className='flex items-center h-9 rounded-md px-4 hover:bg-background-hover-2 text-text-1'
        >
          <HiOutlinePlus size={22} />
          <span className='ml-3'>New project</span>
        </Link>
      </header>
      <ProjectsList preloadedProjects={preloadedProjects} />
    </main>
  );
};

export default ProjectsPage;
