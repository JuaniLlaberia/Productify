'use client';

import { useFormState } from 'react-dom';

import FromBtn from './FromBtn';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { createProject } from '@/lib/actions';

const NewProjectForm = () => {
  const [errorMessage, action] = useFormState(createProject, undefined);

  return (
    <form
      action={action}
      className='w-full mt-8'
    >
      <Label>Project name</Label>
      <Input
        type='text'
        name='name'
        placeholder='Your project name'
      />
      {errorMessage && (
        <p className='text-text-danger text-sm'>{errorMessage.message}</p>
      )}
      <FromBtn className='w-full mt-5'>Create project</FromBtn>
    </form>
  );
};

export default NewProjectForm;
