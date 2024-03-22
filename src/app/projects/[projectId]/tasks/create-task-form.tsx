'use client';

import {
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineUser,
} from 'react-icons/hi2';

import FormBtn from '@/components/form-btn';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { tags } from '@/utils/consts';
import { Id } from '../../../../../convex/_generated/dataModel';
import { createTask } from '@/lib/actions';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { SheetClose } from '@/components/ui/sheet';

type TaskFormType = {
  projectId: Id<'projects'>;
  prevData?: any; //TODO: FIX THIS TYPE!!
};

const TaskForm = ({ projectId, prevData }: TaskFormType) => {
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  // const [errorMessage, action] = useFormState(createTask, undefined);
  const createTaskWithProjId = createTask.bind(null, { projectId, dueDate });

  return (
    <form
      action={createTaskWithProjId}
      className='flex flex-col h-full'
    >
      <div className='flex-1'>
        <Label htmlFor='title'>Title</Label>
        <Input
          placeholder='e.g. Style button component'
          name='title'
          id='title'
        />

        <Label htmlFor='status'>Status</Label>
        <Select
          value={prevData?.status}
          name='status'
          required
        >
          <SelectTrigger
            id='status'
            icon={<HiOutlineSparkles />}
          >
            <SelectValue placeholder='Select status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='progress'>In progress</SelectItem>
            <SelectItem value='finished'>Finished</SelectItem>
          </SelectContent>
        </Select>

        <Label htmlFor='tag'>Tag</Label>
        <Select
          value={prevData?.tag}
          name='tag'
          required
        >
          <SelectTrigger
            id='tag'
            icon={<HiOutlineTag />}
          >
            <SelectValue placeholder='Select tag' />
          </SelectTrigger>
          <SelectContent>
            {tags.map(tag => (
              <SelectItem
                className='capitalize'
                key={tag}
                value={tag}
              >
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor='assignee'>Assignee</Label>
        <Select
          value={prevData?.assignedTo}
          name='assignedTo'
          required
        >
          <SelectTrigger
            id='assignee'
            icon={<HiOutlineUser />}
          >
            <SelectValue placeholder='Select a member' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='progress'>In progress</SelectItem>
            <SelectItem value='finished'>Finished</SelectItem>
          </SelectContent>
        </Select>

        <Label>Due Date</Label>
        <DatePicker
          date={dueDate}
          setDate={setDueDate}
        />

        <Label htmlFor='description'>Description</Label>
        <Textarea
          placeholder='Extra information about the task'
          name='description'
          id='description'
        />
      </div>
      <SheetClose asChild>
        <FormBtn
          type='submit'
          className='mb-8'
        >
          Add
        </FormBtn>
      </SheetClose>
    </form>
  );
};

export default TaskForm;
