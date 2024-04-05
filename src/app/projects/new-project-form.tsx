'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Error from '@/components/ui/error-form';
import { Input } from '../../components/ui/input';
import { api } from '../../../convex/_generated/api';
import { Label } from '../../components/ui/label';
import { ProjectFormSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';

const NewProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProjectFormSchema),
  });
  const router = useRouter();

  const createProject = useMutation(api.projects.createProject);

  const submit = handleSubmit(async data => {
    try {
      const projectId = await createProject({ name: data.name });

      router.push(`/projects/${projectId}/tasks`);
      toast.success('Project created successfully');
    } catch (err) {
      toast.error('Failed to craete new project');
    }
  });

  return (
    <form
      onSubmit={submit}
      className='w-full mt-8 max-w-[500px]'
    >
      <Label>Project name</Label>
      <Input
        type='text'
        placeholder='Your project name'
        {...register('name')}
      />
      <Error error={errors.name?.message as string} />

      <Button
        className='w-full mt-5'
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Create project
      </Button>
    </form>
  );
};

export default NewProjectForm;
