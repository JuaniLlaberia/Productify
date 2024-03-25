import { formatDate, formatDateDistance } from '@/utils/formatDate';
import { Doc } from '../../../../../convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type MessageType = {
  messageData: Doc<'messages'>;
  senderData: Doc<'users'>;
  isFirstInGroup: boolean;
};

const Message = ({ messageData, senderData, isFirstInGroup }: MessageType) => {
  const { _id: messageId, data, _creationTime } = messageData;
  const { profileImg, name } = senderData;

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
          className={`relative flex flex-col text-text- ${
            !isFirstInGroup ? 'ml-12' : ''
          } max-w-[75dvw] break-words overflow-hidden xl:text-lg`}
        >
          {data}
        </p>
      </div>
    </li>
  );
};

export default Message;
