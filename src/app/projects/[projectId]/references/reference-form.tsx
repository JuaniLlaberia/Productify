'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Error from '@/components/ui/error-form';
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ReferenceSchema),
    defaultValues: isEditMode ? prevData : {},
  });

  const createReference = useMutation(api.references.createReference);
  const updateReference = useMutation(api.references.updateReference);

  const submit = handleSubmit(async data => {
    try {
      if (isEditMode) {
        await updateReference({
          referenceData: { ...data },
          projectId: projectId as Id<'projects'>,
          referenceId: prevData._id,
        });
      } else {
        await createReference({
          referenceData: { ...data },
          projectId: projectId as Id<'projects'>,
        });
      }
      toast.success(
        `Reference ${isEditMode ? 'updated' : 'created'} successfully`
      );
    } catch (err) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} reference`);
    }
  });

  return (
    <form
      className='flex flex-col h-full'
      onSubmit={submit}
    >
      <div className='flex-1'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          {...register('name')}
          placeholder='Reference name'
        />
        <Error error={errors?.name?.message as string} />

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
        <Error error={errors?.type?.message as string} />

        <Label htmlFor='reference'>Link</Label>
        <Input
          id='reference'
          placeholder='Reference link'
          {...register('reference')}
        />
        <Error error={errors?.reference?.message as string} />
      </div>

      <Button
        isLoading={isSubmitting}
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className='w-full mt-3 mb-8'
      >
        {isEditMode ? 'Edit' : 'Add'}
      </Button>
    </form>
  );
};

export default ReferenceForm;
