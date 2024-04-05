'use client';

import { Preloaded, usePreloadedQuery } from 'convex/react';
import { HiOutlineFolder } from 'react-icons/hi2';

import ProjectItem, { ExtendedDoc } from './project-item';
import { api } from '../../../convex/_generated/api';

const ProjectsList = (props: {
  preloadedProjects: Preloaded<typeof api.projects.getUserProjects>;
}) => {
  const projects = usePreloadedQuery(props.preloadedProjects);

  return (
    <section className='lg:px-32'>
      {projects.length > 0 ? (
        <ul className='flex flex-col gap-2 w-full mt-3 lg:grid lg:grid-cols-3 lg:gap-4'>
          {projects.map(project => (
            <ProjectItem
              key={project._id}
              project={project as ExtendedDoc}
            />
          ))}
        </ul>
      ) : (
        <p className='flex items-center justify-center gap-3 text-sm text-text-2 my-16'>
          <HiOutlineFolder size={20} /> No projects found
        </p>
      )}
    </section>
  );
};

export default ProjectsList;
