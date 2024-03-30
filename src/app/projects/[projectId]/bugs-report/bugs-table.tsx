'use client';

import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2';
import { usePaginatedQuery } from 'convex/react';

import Badge from '@/components/ui/badge';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

import BugsItemMenu from './bugs-item-menu';

type BugsTableType = {
  projectId: Id<'projects'>;
};

const BugsTable = ({ projectId }: BugsTableType) => {
  const { results, loadMore, status } = usePaginatedQuery(
    api.reports.getReports,
    { projectId },
    { initialNumItems: 5 }
  );

  return (
    <>
      <Table className='border border-border-1'>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-[220px] lg:w-[350px]'>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Importance</TableHead>
            <TableHead className='w-full flex'></TableHead>
          </TableRow>
        </TableHeader>

        {results.length > 0 ? (
          <TableBody>
            {results.map(report => (
              <TableRow key={report._id}>
                <TableCell className='w-[150px] lg:w-[200px]'>
                  {report.name}
                </TableCell>
                <TableCell>
                  <div className='flex'>
                    <Badge text={report.type} color='purple' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex'>
                    <Badge text={report.importance} color='red' />
                  </div>
                </TableCell>

                <TableCell className='flex justify-end mt-1'>
                  <BugsItemMenu
                    reportData={report}
                    projectId={projectId}
                    reportId={report._id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>Empty</TableBody>
        )}
      </Table>
      <footer className='w-full md:px-4 flex items-center space-x-2 py-4'>
        <div className='w-full flex justify-between md:justify-end gap-3 space-x-2'>
          <Button variant='ghost' size='sm'>
            <HiOutlineArrowLeft size={16} className='mr-2' />
            Previous
          </Button>
          <Button variant='ghost' size='sm'>
            Next
            <HiOutlineArrowRight size={16} className='ml-2' />
          </Button>
        </div>
      </footer>
    </>
  );
};

export default BugsTable;
