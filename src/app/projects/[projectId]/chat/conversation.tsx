'use client';

import { useQuery } from 'convex/react';
import { Fragment } from 'react';

import Message from './message';
import MessageLoader from './message-loader';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { groupConsecutiveMessages } from './groupConsecutiveMesages';

const Conversation = ({ projectId }: { projectId: Id<'projects'> }) => {
  //ADD OPTIMISTIC UPDATES???
  const messages = useQuery(api.messages.getMessages, { projectId });

  if (!messages)
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
    <ul className='flex-1 w-full'>
      {messages.length > 0 ? (
        groupConsecutiveMessages(messages)?.map((group, i) => (
          <Fragment key={i}>
            {group.map((message, j) => (
              <Message
                messageData={message}
                senderData={message.sendBy}
                isFirstInGroup={j === 0}
              />
            ))}
          </Fragment>
        ))
      ) : (
        <p>No messages yet</p>
      )}
    </ul>
  );
};

export default Conversation;
