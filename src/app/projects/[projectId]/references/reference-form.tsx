'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReferenceSchema } from '@/lib/schemas';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';

type ReferenceFormType = {
  projectId: string;
  isEditMode?: boolean;
  prevData?: any;
};

const ReferenceForm = ({
  projectId,
  isEditMode = false,
  prevData,
}: ReferenceFormType) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ReferenceSchema),
    defaultValues: isEditMode ? prevData : {},
  });

  const createReference = useMutation(api.references.createReference);
  const updateReference = useMutation(api.references.updateReference);

  const submit = handleSubmit(data => {
    if (isEditMode) {
      updateReference({
        referenceData: { ...data },
        projectId: projectId as Id<'projects'>,
        referenceId: prevData._id,
      });
    } else {
      createReference({
        referenceData: { ...data },
        projectId: projectId as Id<'projects'>,
      });
    }
  });

  return (
    <form className='flex flex-col h-full' onSubmit={submit}>
      <div className='flex-1'>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' {...register('name')} placeholder='Reference name' />
        {errors.name ? (
          <p className='text-text-danger mb-2 text-sm'>
            {errors?.name?.message as string}
          </p>
        ) : null}

        <Label htmlFor='type'>Type</Label>
        <Select
          defaultValue={prevData?.type}
          onValueChange={val => setValue('type', val)}
        >
          <SelectTrigger id='type'>
            <SelectValue placeholder='Select type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='github'>Github</SelectItem>
            <SelectItem value='gitlab'>Gitlab</SelectItem>
            <SelectItem value='stackoverflow'>StackOverflow</SelectItem>
            <SelectItem value='documentation'>Documentation</SelectItem>
            <SelectItem value='other'>Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.type ? (
          <p className='text-text-danger mb-2 text-sm'>
            {errors?.type?.message as string}
          </p>
        ) : null}

        <Label htmlFor='reference'>Link</Label>
        <Input
          id='reference'
          placeholder='Reference link'
          {...register('reference')}
        />
        {errors.reference ? (
          <p className='text-text-danger mb-2 text-sm'>
            {errors?.reference?.message as string}
          </p>
        ) : null}
      </div>

      <Button className='w-full mt-3 mb-8'>
        {isEditMode ? 'Edit' : 'Add'}
      </Button>
    </form>
  );
};

export default ReferenceForm;
