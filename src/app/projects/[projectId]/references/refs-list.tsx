'use client';

import { useQuery } from 'convex/react';

import RefCard from './ref-card';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Skeleton } from '@/components/ui/skeleton';

const RefsList = ({ projectId }: { projectId: string }) => {
  const references = useQuery(api.references.getReferences, {
    projectId: projectId as Id<'projects'>,
  });

  if (!references)
    return (
      <>
        <Skeleton className='h-20 w-full my-2' />
        <Skeleton className='h-20 w-full my-2' />
        <Skeleton className='h-20 w-full my-2' />
        <Skeleton className='h-20 w-full my-2' />
        <Skeleton className='h-20 w-full my-2' />
      </>
    );

  return (
    <ul className='flex flex-col gap-2 w-full mt-3 lg:grid lg:grid-cols-3 lg:gap-4'>
      {references.length > 0 ? (
        references.map(reference => (
          <RefCard
            key={reference._id}
            referenceData={reference}
          />
        ))
      ) : (
        <p className='text-center text-sm text-text-2 py-6'>
          No references yet
        </p>
      )}
    </ul>
  );
};

export default RefsList;
