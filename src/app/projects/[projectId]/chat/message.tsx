'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineTrash } from 'react-icons/hi2';
import { useMutation } from 'convex/react';

import { formatDate, formatDateDistance } from '@/utils/formatDate';
import { Doc } from '../../../../../convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { api } from '../../../../../convex/_generated/api';

type MessageType = {
  messageData: Doc<'messages'>;
  senderData: Doc<'users'>;
  isFirstInGroup: boolean;
};

const Message = ({ messageData, senderData, isFirstInGroup }: MessageType) => {
  const { _id: messageId, data, _creationTime, image, projectId } = messageData;
  const { profileImg, name } = senderData;

  const deleteMessage = useMutation(api.messages.deleteMessage);

  return (
    <li
      id={messageId}
      className={`relative group flex items-start gap-4 ${
        !isFirstInGroup ? 'mt-0 hover:rounded-md transition-all' : 'mt-3 '
      }`}
    >
      {isFirstInGroup ? (
        <Avatar className='size-8'>
          <AvatarFallback>{name.at(0)}</AvatarFallback>
          <AvatarImage
            width={32}
            height={32}
            alt='profile photo'
            src={profileImg}
          />
        </Avatar>
      ) : (
        <p className='hidden group-hover:block absolute bottom-[50%] translate-y-[50%] left-1 text-xs text-text-2'>
          {
            formatDate(new Date(_creationTime!), {
              hour: '2-digit',
              minute: '2-digit',
            }).split(' ')[0]
          }
        </p>
      )}
      <div>
        {isFirstInGroup && (
          <p className='flex items-center gap-2'>
            <span className='text-text-1 text-sm font-medium'>{name}</span>
            <span className='text-text-2 text-xs'>
              {formatDateDistance(new Date(_creationTime!))}
            </span>
          </p>
        )}
        <p
          className={`relative flex flex-col text-text-1 font-light ${
            !isFirstInGroup ? 'ml-12' : ''
          } max-w-[75dvw] break-words overflow-hidden xl:text-lg`}
        >
          {image ? (
            <Link href={image} target='_blank'>
              <Image
                className='mt-3 rounded-md'
                alt='image sent in message'
                src={image}
                width={150}
                height={100}
              />
            </Link>
          ) : null}
          {data ? data : null}
        </p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className='hidden group-hover:block absolute right-5 top-1 text-text-2 hover:text-text-danger'>
            <HiOutlineTrash />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className='text-start'>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription className='text-text-2'>
              Are you sure you want to delete this message?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex flex-row justify-between'>
            <AlertDialogCancel asChild>
              <Button variant='ghost' size='sm'>
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button
              variant='destructive'
              size='sm'
              onClick={() => deleteMessage({ projectId, messageId })}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
};

export default Message;
