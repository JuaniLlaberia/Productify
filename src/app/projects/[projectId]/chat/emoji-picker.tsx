import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { HiOutlineFaceSmile } from 'react-icons/hi2';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Dispatch, SetStateAction } from 'react';

const EmojiPicker = ({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const handleEmojiPick = (emoji: { native: string }) => {
    setValue(prev => prev + emoji.native);
  };

  return (
    <Popover>
      <PopoverTrigger className='p-2 hover:bg-background-hover-2 rounded-md cursor-pointer'>
        <HiOutlineFaceSmile size={24} />
      </PopoverTrigger>
      <PopoverContent className='bg-transparent border-none'>
        <Picker
          onEmojiSelect={handleEmojiPick}
          searchPosition='top'
          previewPosition='none'
          maxFrequentRows='0'
          data={data}
          lazyLoad={true}
          theme='dark'
          set='native'
          tpy
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
