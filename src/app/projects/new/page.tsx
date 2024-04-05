import Link from 'next/link';
import NewProjectForm from '@/app/projects/new-project-form';

const NewProjectPage = () => {
  return (
    <main className='h-full flex flex-col items-center justify-center p-4'>
      <section className='flex flex-col items-start'>
        <h1 className='text-3xl font-semibold text-text-1 mb-2'>New project</h1>
        <p className='text-text-2 text-sm'>
          Build your team efficiency by planning what needs to be done.
        </p>
        <NewProjectForm />
      </section>

      <Link
        href='/projects'
        className='absolute top-2 lg:top-5 right-2 lg:right-5 flex items-center h-9 text-sm rounded-md px-4 hover:bg-background-hover-2 text-text-1'
      >
        Cancel
      </Link>
    </main>
  );
};

export default NewProjectPage;
