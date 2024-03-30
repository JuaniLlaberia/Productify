'use client';

import Image from 'next/image';
import {
  HiOutlineFaceSmile,
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { useMutation } from 'convex/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';
import EmojiPicker from './emoji-picker';

const ChatInput = ({ projectId }: { projectId: Id<'projects'> }) => {
  //Message value
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | undefined>(undefined);

  // Funciton to add message to DB using optimistic updates (shows messages before is on the DB)
  const sendMessage = useMutation(api.messages.sendMessage);
  const getUploadUrl = useMutation(api.utils.generateUploadUrl);
  const getDownloadUrl = useMutation(api.utils.generateDownloadUrl);

  //If user sends message, I should be scrolled to bottom
  const handleSendMessage = async () => {
    if (!image && message.length === 0) return;

    let imgUrl: string;

    //Perform image processing
    if (image) {
      const uploadUrl = await getUploadUrl();
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: image,
      });

      const { storageId } = await response.json();
      imgUrl = await getDownloadUrl({ storageId });

      setImage(undefined);
    }

    sendMessage({
      projectId,
      data: message,
      image: imgUrl!,
      type: Boolean(imgUrl!) ? 'image' : 'message',
    });

    setMessage('');
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full'>
        {image && (
          <div className='relative'>
            <Image
              draggable={false}
              src={URL.createObjectURL(image)}
              alt='message image'
              width={90}
              height={90}
              className='rounded-md size-20 object-cover object-center'
            />
            <button
              onClick={() => {
                setImage(undefined);
              }}
              className='absolute top-2 right-2 bg-background-hover-2 rounded-full p-2'
            >
              <HiOutlineXMark size={18} />
            </button>
          </div>
        )}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            name='data'
            placeholder='Type message here'
          />
        </form>
      </div>
      <div className='flex justify-between'>
        <div className='flex'>
          <Label
            className='p-2 hover:bg-background-hover-2 rounded-md cursor-pointer'
            htmlFor='imageInput'
          >
            <HiOutlinePaperClip size={24} />
          </Label>
          <Input
            onChange={async e => {
              setImage(e.target.files?.[0]);
            }}
            id='imageInput'
            type='file'
            className='hidden'
          />
          <EmojiPicker setValue={setMessage} />
        </div>
        <Button
          type='submit'
          className='px-2'
          size='icon'
          variant='ghost'
          onClick={() => {
            handleSendMessage();
          }}
        >
          <HiOutlinePaperAirplane size={25} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
