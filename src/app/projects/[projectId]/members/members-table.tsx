'use client';

import { usePaginatedQuery } from 'convex/react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2';

import MemberRow from './member-row';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type MembersTableType = {
  projectId: Id<'projects'>;
};

const MembersTable = ({ projectId }: MembersTableType) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.projects.getMembersPaginated,
    { projectId },
    { initialNumItems: 5 }
  );

  return (
    <>
      <Table className='border border-border-1'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'></TableHead>
            <TableHead className='min-w-[150px] lg:w-[200px]'>Name</TableHead>
            <TableHead className='w-[200px] lg:w-[250px]'>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className='w-full flex'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results?.map(member => (
            <MemberRow
              key={member._id}
              member={member}
              projectId={projectId}
            />
          ))}
        </TableBody>
      </Table>
      <footer className='w-full md:px-4 flex items-center space-x-2 py-4'>
        <div className='w-full flex justify-between md:justify-end gap-3 space-x-2'>
          <Button
            variant='ghost'
            size='sm'
          >
            <HiOutlineArrowLeft
              size={16}
              className='mr-2'
            />
            Previous
          </Button>
          <Button
            variant='ghost'
            size='sm'
          >
            Next
            <HiOutlineArrowRight
              size={16}
              className='ml-2'
            />
          </Button>
        </div>
      </footer>
    </>
  );
};

export default MembersTable;
