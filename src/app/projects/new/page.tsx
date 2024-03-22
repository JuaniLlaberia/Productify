import NewProjectForm from '@/app/projects/new-project-form';
import Link from 'next/link';

const NewProjectPage = () => {
  return (
    <main className='h-full flex flex-col justify-center p-4'>
      <h1 className='text-3xl font-semibold text-text-1 mb-2'>New project</h1>
      <p className='text-text-2 text-sm'>
        Build your team efficiency by planning what needs to be done.
      </p>
      <NewProjectForm />
      <Link
        href='/projects'
        className='absolute top-2 right-2 flex items-center h-9 text-sm rounded-md px-4 hover:bg-background-hover-2 text-text-1'
      >
        Cancel
      </Link>
    </main>
  );
};

export default NewProjectPage;
