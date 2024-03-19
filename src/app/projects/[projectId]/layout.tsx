import Sidebar from '@/components/Sidebar';

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex h-full'>
      <Sidebar />
      {children}
    </main>
  );
}
