'use client';

import {
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineUser,
} from 'react-icons/hi2';
import { useMutation, useQuery } from 'convex/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Error from '@/components/ui/error-form';
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
import { api } from '../../../../../convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TaskFormSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';

type TaskFormType = {
  projectId: Id<'projects'>;
  editMode?: boolean;
  prevData?: any;
};

const TaskForm = ({ projectId, prevData, editMode = false }: TaskFormType) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: editMode ? prevData : { status: prevData?.status },
  });

  const members = useQuery(api.projects.getMembers, {
    projectId,
  });

  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);

  const submit = handleSubmit(async data => {
    if (editMode) {
      await updateTask({ taskData: { ...data, _id: prevData._id, projectId } });
    } else {
      await createTask({ taskData: { ...data, projectId } });
    }
  });

  return (
    <form
      onSubmit={submit}
      className='flex flex-col h-full'
    >
      <div className='flex-1 overflow-y-auto mb-3 px-1'>
        <Label htmlFor='title'>Title</Label>
        <Input
          placeholder='e.g. Style button component'
          id='title'
          {...register('title')}
        />
        <Error error={errors?.title?.message as string} />

        <Label htmlFor='status'>Status</Label>
        <Select
          onValueChange={val => setValue('status', val)}
          defaultValue={prevData?.status}
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
        <Error error={errors?.status?.message as string} />

        <Label htmlFor='tag'>Tag</Label>
        <Select
          defaultValue={prevData?.tag}
          onValueChange={val => setValue('tag', val)}
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
        <Error error={errors?.tag?.message as string} />

        <Label htmlFor='assignee'>Assignee</Label>
        <Select
          defaultValue={prevData?.assignedTo}
          onValueChange={val => setValue('assignedTo', val)}
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
        <Error error={errors?.assignedTo?.message as string} />

        <Label htmlFor='importance'>Priority Type</Label>
        <Select
          defaultValue={prevData?.importance}
          onValueChange={val => setValue('importance', val)}
        >
          <SelectTrigger
            id='importance'
            icon={<HiOutlineCalendarDays />}
          >
            <SelectValue placeholder='Select a priority' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='p-0'>P-0 (Critical)</SelectItem>
            <SelectItem value='p-1'>P-1 (High)</SelectItem>
            <SelectItem value='p-2'>P-2 (Medium)</SelectItem>
            <SelectItem value='p-3'>P-3 (Low)</SelectItem>
            <SelectItem value='p-4'>P-4 (Minimal)</SelectItem>
          </SelectContent>
        </Select>
        <Error error={errors?.importance?.message as string} />

        <Label htmlFor='description'>Description</Label>
        <Textarea
          placeholder='Extra information about the task'
          {...register('description')}
          id='description'
        />
        <Error error={errors?.description?.message as string} />
      </div>
      <Button
        className='mb-8'
        isLoading={isSubmitting}
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
      >
        {editMode ? 'Update' : 'Add'}
      </Button>
    </form>
  );
};

export default TaskForm;
