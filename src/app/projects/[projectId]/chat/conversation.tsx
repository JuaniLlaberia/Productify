'use client';

import { usePaginatedQuery } from 'convex/react';
import { Fragment } from 'react';
import { ClipLoader } from 'react-spinners';
import { useTheme } from 'next-themes';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import Message from './message';
import MessageLoader from './message-loader';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { groupConsecutiveMessages } from './groupConsecutiveMesages';
import { Button } from '@/components/ui/button';

const Conversation = ({ projectId }: { projectId: Id<'projects'> }) => {
  const { theme } = useTheme();
  const { results, loadMore, status } = usePaginatedQuery(
    api.messages.getMessages,
    { projectId },
    {
      initialNumItems: 30,
    }
  );

  if (status === 'LoadingFirstPage')
    return (
      <ul className='flex flex-col flex-1 gap-6 w-full'>
        <MessageLoader />
        <MessageLoader />
        <MessageLoader />
        <MessageLoader />
        <MessageLoader />
      </ul>
    );

  return (
    <ul className='flex-1 w-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-corner-transparent scrollbar-thumb-background-3'>
      <div className='flex items-center justify-center'>
        {status === 'CanLoadMore' ? (
          <Button
            size='sm'
            variant='ghost'
            className='text-text-2'
            onClick={() => loadMore(10)}
          >
            Load previous
          </Button>
        ) : status === 'LoadingMore' ? (
          <ClipLoader
            color={theme === 'light' ? '#1f1c1c' : '#fffafa81'}
            size={25}
            className='mr-3'
          />
        ) : null}
      </div>
      {results.length > 0 ? (
        groupConsecutiveMessages(
          results.sort((a, b) => a._creationTime - b._creationTime)
        )?.map((group, i) => (
          <Fragment key={i}>
            {group.map((message, j) => (
              <Message
                key={message._id}
                messageData={message}
                senderData={message.sendBy}
                isFirstInGroup={j === 0}
              />
            ))}
          </Fragment>
        ))
      ) : (
        <div className='flex flex-col h-full items-center justify-center'>
          <span className='p-4 bg-background-hover-2 text-text-2 rounded-full mb-2'>
            <HiOutlineEnvelope size={30} />
          </span>
          <h2 className='text-xl text-text-1 font-medium'>No messages yet</h2>
          <p className='text-text-2 text-sm'>
            Be the first one to start the conversation
          </p>
        </div>
      )}
    </ul>
  );
};

export default Conversation;
