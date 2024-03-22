'use client';

import { useFormState } from 'react-dom';

import FromBtn from '../../components/form-btn';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { State, createProject } from '@/lib/actions';

const defaultDate: State = {
  message: '',
};

const NewProjectForm = () => {
  const [errorMessage, action] = useFormState(createProject, defaultDate);

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
