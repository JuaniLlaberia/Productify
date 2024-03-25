import { fetchQuery } from 'convex/nextjs';

import RefCard from './ref-card';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

const RefsList = async ({ projectId }: { projectId: string }) => {
  const references = await fetchQuery(api.references.getReferences, {
    projectId: projectId as Id<'projects'>,
  });

  return (
    <ul className='flex flex-col gap-2 w-full mt-3'>
      {references.map(reference => (
        <RefCard
          key={reference._id}
          referenceData={reference}
        />
      ))}
    </ul>
  );
};

export default RefsList;
