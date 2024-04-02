'use client';

import { useQuery } from 'convex/react';

import RefCard from './ref-card';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Skeleton } from '@/components/ui/skeleton';
import { HiOutlineLink } from 'react-icons/hi2';

const RefsList = ({ projectId }: { projectId: string }) => {
  const references = useQuery(api.references.getReferences, {
    projectId: projectId as Id<'projects'>,
  });

  if (!references)
    return (
      <section className='flex flex-col gap-2 w-full mt-3 lg:grid lg:grid-cols-3 lg:gap-4'>
        <Skeleton className='h-20 w-full my-2' />
        <Skeleton className='h-20 w-full my-2' />
        <Skeleton className='h-20 w-full my-2' />
        <Skeleton className='h-20 w-full my-2' />
        <Skeleton className='h-20 w-full my-2' />
      </section>
    );

  return (
    <>
      {references.length > 0 ? (
        <ul className='flex flex-col gap-2 w-full mt-3 lg:grid lg:grid-cols-3 lg:gap-4'>
          {references.map(reference => (
            <RefCard
              key={reference._id}
              referenceData={reference}
            />
          ))}
        </ul>
      ) : (
        <p className='flex flex-col gap-2 items-center justify-center text-text-2 py-5 min-h-[200px] bg-background-1 border border-border-1 w-full rounded-lg'>
          <span className='p-3 bg-background-3 rounded-full'>
            <HiOutlineLink size={25} />
          </span>
          No references yet
        </p>
      )}
    </>
  );
};

export default RefsList;
