'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';
import { useMutation } from 'convex/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { reportsSchema } from '@/lib/schemas';
import { api } from '../../../../../convex/_generated/api';
import { Doc, Id } from '../../../../../convex/_generated/dataModel';
import Error from '@/components/ui/error-form';

type ReportsFormType = {
  projectId: Id<'projects'>;
  editMode?: boolean;
  prevData?: Doc<'reports'>;
};

const ReportsForm = ({
  projectId,
  prevData,
  editMode = false,
}: ReportsFormType) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportsSchema),
    defaultValues: editMode ? prevData : {},
  });

  const createBugReport = useMutation(api.reports.createReport);
  const updateBugReport = useMutation(api.reports.updateReport);

  const submit = handleSubmit(data => {
    if (editMode) {
      updateBugReport({
        projectId,
        reportData: { ...data, _id: prevData?._id! },
      });
    } else {
      createBugReport({ projectId, reportData: { ...data } });
    }
  });

  return (
    <form onSubmit={submit} className='flex flex-col h-full'>
      <div className='flex-1'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          type='text'
          placeholder='e.g. Home button not working'
          {...register('name')}
        />
        <Error error={errors?.name?.message as string} />

        <Label htmlFor='type'>Type</Label>
        <Select
          defaultValue={prevData?.type}
          onValueChange={val => setValue('type', val)}
        >
          <SelectTrigger id='type' icon={<HiOutlineTag />} className='my-2'>
            <SelectValue placeholder='Select a type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ui/ux'>UI/UX</SelectItem>
            <SelectItem value='functional'>Functional</SelectItem>
            <SelectItem value='performance'>Performance</SelectItem>
            <SelectItem value='security'>Security</SelectItem>
            <SelectItem value='other'>Other</SelectItem>
          </SelectContent>
        </Select>
        <Error error={errors?.type?.message as string} />

        <Label htmlFor='importance'>Importance</Label>
        <Select
          defaultValue={prevData?.importance}
          onValueChange={val => setValue('importance', val)}
        >
          <SelectTrigger
            id='importance'
            icon={<HiOutlineCalendarDays />}
            className='my-2'
          >
            <SelectValue placeholder='Select importance' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='urgent'>Urgent</SelectItem>
            <SelectItem value='important'>Important</SelectItem>
            <SelectItem value='moderate'>Moderate</SelectItem>
          </SelectContent>
        </Select>
        <Error error={errors?.importance?.message as string} />

        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          placeholder='Write a description about the bug'
          {...register('description')}
        />
        <Error error={errors?.description?.message as string} />
      </div>

      <Button className='mt-4 mb-8 w-full'>
        {editMode ? 'Update' : 'Add'}
      </Button>
    </form>
  );
};

export default ReportsForm;
