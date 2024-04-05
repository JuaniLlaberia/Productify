'use client';

import { useQuery } from 'convex/react';
import { useState } from 'react';
import { HiOutlineLink, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import RefCard from './ref-card';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

const RefsList = ({ projectId }: { projectId: string }) => {
  const references = useQuery(api.references.getReferences, {
    projectId: projectId as Id<'projects'>,
  });

  const [filter, setFilter] = useState('');

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

  const filteredReferences = references.filter(
    ref =>
      ref.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      ref.type.includes(filter.toLocaleLowerCase())
  );

  return (
    <>
      <section className='w-full md:flex md:items-center md:justify-end'>
        <Input
          onChange={e => setFilter(e.target.value)}
          className='w-full'
          icon={<HiOutlineMagnifyingGlass />}
          placeholder='Search by reference name'
        />
      </section>
      {filteredReferences.length > 0 ? (
        <ul className='flex flex-col gap-2 w-full mt-3 lg:grid lg:grid-cols-3 lg:gap-4'>
          {filteredReferences.map(reference => (
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
