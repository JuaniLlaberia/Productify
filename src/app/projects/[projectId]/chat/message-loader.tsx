import { Skeleton } from '@/components/ui/skeleton';

const MessageLoader = () => {
  return (
    <li className='flex items-start gap-4'>
      <Skeleton className='size-8 w-10 rounded-full' />
      <div className='flex flex-col gap-2 w-full'>
        <Skeleton className='w-1/2 h-3' />
        <Skeleton className='w-full h-3' />
        <Skeleton className='w-full h-3' />
        <Skeleton className='w-3/4 h-3' />
      </div>
    </li>
  );
};

export default MessageLoader;
