import { HiOutlinePaperAirplane, HiOutlinePaperClip } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sendMessage } from '@/lib/actions/messages-actions';
import { Id } from '../../../../../convex/_generated/dataModel';

const ChatInput = ({ projectId }: { projectId: Id<'projects'> }) => {
  const actionWithId = sendMessage.bind(null, projectId);

  return (
    <div className='flex items-center gap-2 w-full mt-2'>
      <Button
        variant='ghost'
        size='icon'
      >
        <HiOutlinePaperClip size={25} />
      </Button>

      <form
        action={actionWithId}
        className='flex items-center gap-2 w-full'
      >
        <Label className='sr-only'>Message</Label>
        <Input
          name='data'
          min={1}
          required
          placeholder='Type here'
        />
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
