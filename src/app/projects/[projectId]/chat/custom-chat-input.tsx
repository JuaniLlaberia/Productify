'use client';

import { HiOutlinePaperAirplane, HiOutlinePaperClip } from 'react-icons/hi2';
import { useMutation } from 'convex/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';

const ChatInput = ({ projectId }: { projectId: Id<'projects'> }) => {
  //Message value
  const [message, setMessage] = useState('');

  // Funciton to add message to DB using optimistic updates (shows messages before is on the DB)
  const sendMessage = useMutation(api.messages.sendMessage);

  //If user sends message, I should be scrolled to bottom
  const handleSendMessage = (
    projectId: Id<'projects'>,
    newMessageText: string,
    type: 'message' | 'image'
  ) => {
    sendMessage({ projectId: projectId, data: newMessageText, type });
  };

  const getUploadUrl = useMutation(api.users.generateUploadUrl);
  const getDownloadUrl = useMutation(api.users.generateDownloadUrl);

  return (
    <div className='flex items-center gap-2 w-full mt-2'>
      <Label
        className='p-2 hover:bg-background-hover-2 rounded-md cursor-pointer'
        htmlFor='imageInput'
      >
        <HiOutlinePaperClip size={25} />
      </Label>
      <Input
        onChange={async e => {
          const file = e.currentTarget.files?.[0];

          const uploadUrl = await getUploadUrl();
          const response = await fetch(uploadUrl, {
            method: 'POST',
            body: file,
          });

          const { storageId } = await response.json();
          const imageUrl = await getDownloadUrl({ storageId });

          handleSendMessage(projectId, imageUrl, 'image');
        }}
        id='imageInput'
        type='file'
        className='hidden'
      />

      <form
        onSubmit={e => {
          e.preventDefault();
          if (message.length === 0) return;

          handleSendMessage(projectId, message, 'message');
          setMessage('');
        }}
        className='flex items-center gap-2 w-full'
      >
        <Label className='sr-only'>Message</Label>
        <div className='w-full'>
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            name='data'
            placeholder='Type message here'
          />
        </div>
        <Button
          type='submit'
          className='hidden md:block'
        >
          Send
        </Button>
        <Button
          type='submit'
          className='md:hidden px-2'
          size='icon'
          variant='ghost'
        >
          <HiOutlinePaperAirplane size={25} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
