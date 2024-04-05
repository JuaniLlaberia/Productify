'use client';

import * as React from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { HiOutlineCalendarDays } from 'react-icons/hi2';

type DatePickerType = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export function DatePicker({ date, setDate }: DatePickerType) {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className='border border-border-1 my-1'
      >
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start gap-2 text-left font-normal px-3',
            !date && 'text-muted-foreground'
          )}
        >
          <span className='text-lge'>
            <HiOutlineCalendarDays className='mr-2' />
          </span>
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
