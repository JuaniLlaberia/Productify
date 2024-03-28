'use client';

import { useQuery } from 'convex/react';

import TasksColumn from './tasks-column';
import { api } from '../../../../../convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Doc, Id } from '../../../../../convex/_generated/dataModel';

type Tasks = {
  pending: Doc<'tasks'>[];
  progress: Doc<'tasks'>[];
  finished: Doc<'tasks'>[];
};

const TasksBoard = ({ projectId }: { projectId: Id<'projects'> }) => {
  const tasks = useQuery(api.tasks.getTasks, {
    projectId,
  }) as Tasks;

  if (!tasks)
    return (
      <ul className='flex h-full w-full gap-6'>
        <Skeleton className='w-full h-full min-w-[325px] max-w-[425px]' />
        <Skeleton className='w-full h-full min-w-[325px] max-w-[425px]' />
        <Skeleton className='w-full h-full min-w-[325px] max-w-[425px]' />
      </ul>
    );

  return (
    <ul className='flex w-full items-start gap-4 pr-4'>
      <TasksColumn
        projectId={projectId as Id<'projects'>}
        status='pending'
        tasks={tasks.pending || []}
      />
      <TasksColumn
        projectId={projectId as Id<'projects'>}
        status='progress'
        tasks={tasks.progress || []}
      />
      <TasksColumn
        projectId={projectId as Id<'projects'>}
        status='finished'
        tasks={tasks.finished || []}
      />
    </ul>
  );
};

export default TasksBoard;
