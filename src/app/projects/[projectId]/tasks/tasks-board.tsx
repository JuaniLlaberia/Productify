'use client';

import { useQuery } from 'convex/react';

import TasksColumn from './tasks-column';
import { api } from '../../../../../convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Id } from '../../../../../convex/_generated/dataModel';

const TasksBoard = ({ projectId }: { projectId: string }) => {
  const tasks = useQuery(api.projects.getTasks);

  if (!tasks)
    return (
      <ul className='flex h-full w-full gap-6'>
        <Skeleton className='w-full h-full min-w-[325px] max-w-[425px]' />
        <Skeleton className='w-full h-full min-w-[325px] max-w-[425px]' />
        <Skeleton className='w-full h-full min-w-[325px] max-w-[425px]' />
      </ul>
    );

  return (
    <ul className='flex w-full items-start gap-3 pr-4'>
      <TasksColumn
        projectId={projectId as Id<'projects'>}
        status='pending'
        tasks={tasks}
      />
      <TasksColumn
        projectId={projectId as Id<'projects'>}
        status='progress'
        tasks={tasks}
      />
      <TasksColumn
        projectId={projectId as Id<'projects'>}
        status='finished'
        tasks={tasks}
      />
    </ul>
  );
};

export default TasksBoard;
