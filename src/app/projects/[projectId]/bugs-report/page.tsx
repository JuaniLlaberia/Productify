import BugsTable from './bugs-table';
import { Id } from '../../../../../convex/_generated/dataModel';

const BugsReportPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <>
      <header className='w-full flex flex-col md:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6'>
        <h1 className='text-xl w-full mb-3 lg:mb-0'>Bugs reports</h1>
      </header>
      <BugsTable projectId={params.projectId as Id<'projects'>} />
    </>
  );
};

export default BugsReportPage;
