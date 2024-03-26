'use client';

import {
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineUser,
} from 'react-icons/hi2';
import { useQuery } from 'convex/react';

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
import { tags } from '@/utils/consts';
import { Id } from '../../../../../convex/_generated/dataModel';
import { createTask, updateTask } from '@/lib/actions/tasks-actions';
import { api } from '../../../../../convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SheetClose } from '@/components/ui/sheet';

type TaskFormType = {
  projectId: Id<'projects'>;
  editMode?: boolean;
  prevData?: any;
};

const TaskForm = ({ projectId, prevData, editMode = false }: TaskFormType) => {
  const members = useQuery(api.projects.getMembers, {
    projectId,
    userEmail: 'juanillaberia2002@gmail.com',
  });

  //Binded actions
  const createTaskWithProjId = createTask.bind(null, { projectId });
  const updateTaskWithProjId = updateTask.bind(null, {
    taskId: prevData?._id,
    projectId,
  });

  return (
    <form
      action={editMode ? updateTaskWithProjId : createTaskWithProjId}
      className='flex flex-col h-full'
    >
      <div className='flex-1'>
        <Label htmlFor='title'>Title</Label>
        <Input
          defaultValue={prevData?.title}
          placeholder='e.g. Style button component'
          name='title'
          id='title'
        />

        <Label htmlFor='status'>Status</Label>
        <Select
          defaultValue={prevData?.status}
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
          defaultValue={prevData?.tag}
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
          defaultValue={prevData?.assignedTo}
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
            {members?.map(member => (
              <SelectItem
                key={member._id}
                value={member._id!}
              >
                <div className='flex items-center gap-2'>
                  <Avatar className='size-7'>
                    <AvatarImage src={member.profileImg} />
                    <AvatarFallback>{member.name?.at(0)}</AvatarFallback>
                  </Avatar>
                  <p>{member.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor='importance'>Deadline Type</Label>
        <Select
          name='importance'
          defaultValue={prevData?.importance}
          required
        >
          <SelectTrigger
            id='importance'
            icon={<HiOutlineCalendarDays />}
          >
            <SelectValue placeholder='Select a deadline' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='urgent'>Urgent</SelectItem>
            <SelectItem value='important'>Important</SelectItem>
            <SelectItem value='moderate'>Moderate</SelectItem>
          </SelectContent>
        </Select>

        <Label htmlFor='description'>Description</Label>
        <Textarea
          defaultValue={prevData?.description}
          placeholder='Extra information about the task'
          name='description'
          id='description'
        />
      </div>
      <FormBtn
        type='submit'
        className='mb-8'
      >
        <SheetClose>{editMode ? 'Update' : 'Add'}</SheetClose>
      </FormBtn>
    </form>
  );
};

export default TaskForm;
