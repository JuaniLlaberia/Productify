'use client';

import { usePaginatedQuery, useQuery } from 'convex/react';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineEllipsisVertical,
  HiOutlineSparkles,
  HiOutlineTrash,
} from 'react-icons/hi2';

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import FormBtn from '@/components/form-btn';

type BugsTableType = {
  projectId: Id<'projects'>;
};

const BugsTable = ({ projectId }: BugsTableType) => {
  //   const members = useQuery(api.projects.getMembers, { projectId });
  // const { results, status, loadMore } = usePaginatedQuery(
  //   api.projects.getMembers,
  //   { projectId, userEmail },
  //   { initialNumItems: 2 }
  // );

  // console.log(results);

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
        <TableBody>
          <TableRow>
            <TableCell className='w-[150px] lg:w-[200px]'>
              Home page button bug
            </TableCell>
            <TableCell>
              <div className='flex'>
                <Badge
                  text='UI'
                  color='purple'
                />
              </div>
            </TableCell>
            <TableCell>
              <div className='flex'>
                <Badge
                  text='important'
                  color='red'
                />
              </div>
            </TableCell>

            <TableCell className='flex justify-end mt-1'>
              <AlertDialog>
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
                    <DropdownMenuItem>
                      <HiOutlineSparkles className='mr-2 h-4 w-4' />
                      <span>Make task</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='text-text-danger'
                      asChild
                    >
                      <AlertDialogTrigger className='w-full'>
                        <>
                          <HiOutlineTrash className='mr-2 h-4 w-4' />
                          <span>Remove member</span>
                        </>
                      </AlertDialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                  <AlertDialogTitle>Remove Member</AlertDialogTitle>
                  <AlertDialogDescription className='text-text-2'>
                    Are you sure you want to remove this member?{' '}
                    <span className='text-text-1 font-semibold'>
                      It can re-join the project again.
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
                    <form action={''}>
                      <FormBtn
                        dangerMode
                        size='sm'
                      >
                        Confirm
                      </FormBtn>
                    </form>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
          {/* {members?.map(member => (
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarFallback></AvatarFallback>
                  <AvatarImage src={member.profileImg} />
                </Avatar>
              </TableCell>
              <TableCell className='w-[150px] lg:w-[200px]'>
                {member.name}
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell className='text-right'>
                <div className='flex'>
                  <Badge
                    text={member.role as string}
                    color={`${member.role === 'member' ? 'blue' : 'red'}`}
                  />
                </div>
              </TableCell>
              <TableCell className='flex justify-end mt-1'>
                <AlertDialog>
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
                      <DropdownMenuItem>
                        <HiOutlineSparkles className='mr-2 h-4 w-4' />
                        <span>Make admin</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='text-text-danger'
                        asChild
                      >
                        <AlertDialogTrigger className='w-full'>
                          <>
                            <HiOutlineTrash className='mr-2 h-4 w-4' />
                            <span>Remove member</span>
                          </>
                        </AlertDialogTrigger>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <AlertDialogContent>
                    <AlertDialogTitle>Remove Member</AlertDialogTitle>
                    <AlertDialogDescription className='text-text-2'>
                      Are you sure you want to remove this member?{' '}
                      <span className='text-text-1 font-semibold'>
                        It can re-join the project again.
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
                      <form action={''}>
                        <FormBtn
                          dangerMode
                          size='sm'
                        >
                          Confirm
                        </FormBtn>
                      </form>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))} */}
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

export default BugsTable;
