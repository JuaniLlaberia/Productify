'use client';

import {
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineSparkles,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { useState } from 'react';

import ReportsForm from './reports-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { api } from '../../../../../convex/_generated/api';
import { Doc, Id } from '../../../../../convex/_generated/dataModel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type BugMenuType = {
  reportData: Doc<'reports'>;
  projectId: Id<'projects'>;
  reportId: Id<'reports'>;
};

const BugsItemMenu = ({ projectId, reportId, reportData }: BugMenuType) => {
  const [isLoading, setIsLoading] = useState(false);
  const makeTask = useMutation(api.reports.reportToTask);
  const deleteReport = useMutation(api.reports.deleteReport);

  return (
    <AlertDialog>
      <Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
            >
              <HiOutlineEllipsisVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => makeTask({ projectId, reportId })}>
              <HiOutlineSparkles className='mr-2 h-4 w-4' />
              <span>Make task</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <SheetTrigger className='w-full'>
                <HiOutlinePencil className='mr-2 h-4 w-4' />
                <span>Edit report</span>
              </SheetTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-text-danger'
              asChild
            >
              <AlertDialogTrigger className='w-full'>
                <>
                  <HiOutlineTrash className='mr-2 h-4 w-4' />
                  <span>Remove report</span>
                </>
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetContent>
          <ReportsForm
            editMode
            prevData={reportData}
            projectId={projectId}
          />
        </SheetContent>
      </Sheet>
      <AlertDialogContent>
        <AlertDialogTitle>Remove Bug Report</AlertDialogTitle>
        <AlertDialogDescription className='text-text-2'>
          Are you sure you want to remove this bug report?{' '}
          <span className='text-text-1 font-semibold'>
            This action is not reversible.
          </span>
        </AlertDialogDescription>
        <AlertDialogFooter className='flex flex-row justify-between'>
          <AlertDialogCancel asChild>
            <Button
              variant='ghost'
              size='sm'
            >
              Cancel
            </Button>
          </AlertDialogCancel>

          <Button
            isLoading={isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);
                await deleteReport({ projectId, reportId });
                toast.success('Bug report deleted');
              } catch (err) {
                toast.error('Failed to delete bug report');
              } finally {
                setIsLoading(false);
              }
            }}
            variant='destructive'
            size='sm'
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BugsItemMenu;
