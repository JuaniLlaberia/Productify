'use client';

import { usePaginatedQuery, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';

type MembersTableType = {
  projectId: Id<'projects'>;
  userEmail: string;
};

const MembersTable = ({ projectId, userEmail }: MembersTableType) => {
  const members = useQuery(api.projects.getMembers, { projectId, userEmail });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className='text-right'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members?.map(member => (
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarFallback></AvatarFallback>
                <AvatarImage src={member.profileImg} />
              </Avatar>
            </TableCell>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell className='text-right'>
              <Badge
                text={member.role as string}
                color='red'
              />
            </TableCell>
            <TableCell>
              <HiOutlineEllipsisVertical size={20} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MembersTable;
