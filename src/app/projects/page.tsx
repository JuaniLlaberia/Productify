import Link from 'next/link';
import { fetchQuery } from 'convex/nextjs';
import { getServerSession } from 'next-auth';
import { HiOutlineBell, HiOutlinePlus } from 'react-icons/hi2';

import UserMenu from '@/components/UserMenu';
import { Button } from '@/components/ui/button';
import { api } from '../../../convex/_generated/api';

import ProjectItem from '@/components/ProjectItem';

const ProjectsPage = async () => {
  const session = await getServerSession();
  const projects = await fetchQuery(api.projects.getUserProjects);

  return (
    <main>
      <nav className='flex items-center justify-end gap-3 p-3'>
        <Button
          variant='ghost'
          size='icon'
        >
          <HiOutlineBell size={24} />
        </Button>
        <UserMenu
          email={session?.user?.email!}
          withText={false}
        />
      </nav>
      <header className='flex items-center justify-between p-2 px-3 my-3'>
        <h1 className='text-2xl text-text-1 font-semibold'>
          Projects ({projects?.length})
        </h1>
        <Link
          href='/projects/new'
          className='flex items-center h-9 rounded-md px-4 hover:bg-background-hover-2 text-text-1'
        >
          <HiOutlinePlus size={22} />
          <span className='ml-3'>New project</span>
        </Link>
      </header>
      <section>
        <ul className='flex flex-col gap-2.5 p-3'>
          {projects.map(project => (
            <ProjectItem
              key={project._id}
              {...project}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ProjectsPage;
