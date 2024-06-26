import Sidebar from '@/app/projects/[projectId]/sidebar';
import NavbarProjects from '@/app/projects/[projectId]/navbar-projects';

export default async function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex h-full'>
      <Sidebar />
      <section className='w-full flex flex-col flex-1 max-h-screen overflow-y-auto overflow-x-hidden'>
        <NavbarProjects />
        <div className='h-full w-ful flex overflow-x-auto overflow-y-auto flex-col items-center p-3 lg:pt-6 lg:px-14 xl:px-48 transition-all md:scrollbar md:scrollbar-thumb-scroll-light-hover hover:md:scrollbar-thumb-scroll-light'>
          {children}
        </div>
      </section>
    </main>
  );
}
