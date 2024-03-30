'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';

import { Input } from '../../components/ui/input';
import { api } from '../../../convex/_generated/api';
import { Label } from '../../components/ui/label';
import { ProjectFormSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';

const NewProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProjectFormSchema),
  });
  const router = useRouter();

  const createProject = useMutation(api.projects.createProject);

  const submit = handleSubmit(async data => {
    const projectId = await createProject({ name: data.name });

    router.push(`/projects/${projectId}/dashboard`);
  });

  return (
    <form onSubmit={submit} className='w-full mt-8'>
      <Label>Project name</Label>
      <Input
        type='text'
        placeholder='Your project name'
        {...register('name')}
      />
      {errors.name && (
        <p className='text-text-danger text-sm'>
          {errors.name?.message as string}
        </p>
      )}
      <Button className='w-full mt-5'>Create project</Button>
    </form>
  );
};

export default NewProjectForm;
