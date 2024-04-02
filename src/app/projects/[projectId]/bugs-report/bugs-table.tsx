'use client';

import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2';
import { usePaginatedQuery } from 'convex/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

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
import { priorityColor } from '../tasks/task-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

type BugsTableType = {
  projectId: Id<'projects'>;
};

const BugsTable = ({ projectId }: BugsTableType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const typeParam = searchParams.get('type') || 'all';
  const priorityParam = searchParams.get('priority') || 'all';

  const { results, loadMore, status } = usePaginatedQuery(
    api.reports.getReports,
    { projectId, filters: { type: typeParam, priority: priorityParam } },
    { initialNumItems: 5 }
  );

  const onSelectValue = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (name === 'all') {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    const search = params.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <>
      <div className='w-full mb-4 md:flex md:gap-2 md:justify-end'>
        <Select
          defaultValue={typeParam}
          onValueChange={val => {
            onSelectValue('type', val);
          }}
        >
          <SelectTrigger className='w-full md:w-48'>
            <SelectValue placeholder='By Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            <SelectItem value='ui/ux'>UI/UX</SelectItem>
            <SelectItem value='functional'>Functional</SelectItem>
            <SelectItem value='performance'>Performance</SelectItem>
            <SelectItem value='security'>Security</SelectItem>
            <SelectItem value='other'>Other</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={priorityParam}
          onValueChange={val => {
            onSelectValue('priority', val);
          }}
        >
          <SelectTrigger className='w-full md:w-48'>
            <SelectValue placeholder='By Priority' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Priorities</SelectItem>
            <SelectItem value='p-0'>P-0 (Critical)</SelectItem>
            <SelectItem value='p-1'>P-1 (High)</SelectItem>
            <SelectItem value='p-2'>P-2 (Medium)</SelectItem>
            <SelectItem value='p-3'>P-3 (Low)</SelectItem>
            <SelectItem value='p-4'>P-4 (Minimal)</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
                  <p className='line-clamp-3'>{report.name}</p>
                </TableCell>
                <TableCell>
                  <div className='flex'>
                    <Badge
                      text={report.type}
                      color='purple'
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex'>
                    <Badge
                      text={report.importance}
                      color={priorityColor(report.importance)}
                    />
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
          <TableRow>
            <TableCell
              colSpan={10}
              className='h-24 text-center text-text-2'
            >
              {status === 'LoadingFirstPage' ? (
                <div className='flex items-center justify-center'>
                  <Loader2 className='animate-spin mr-2' />
                </div>
              ) : (
                'No results'
              )}
            </TableCell>
          </TableRow>
        )}
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
            onClick={() => loadMore(5)}
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

export default BugsTable;
