'use client';

import { useQuery } from 'convex/react';

import SettingsCard from '@/components/settings-card';
import FormBtn from '@/components/form-btn';
import Badge from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';

type ProjectSettingsCardsType = {
  projectId: Id<'projects'>;
};

const ProjectSettingsCards = ({ projectId }: ProjectSettingsCardsType) => {
  const projectData = useQuery(api.projects.getProject, {
    projectId,
  });

  return (
    <ul className='flex flex-col gap-4'>
      <SettingsCard
        title='Project Name'
        description='Please enter the project name that all memebers are able to see.'
        formChild={
          <form>
            <Input
              name='name'
              className='bg-background-2'
              defaultValue={projectData?.name}
              type='text'
              placeholder='Front-End Team'
            />
            <div className='flex items-center justify-end mt-2'>
              <FormBtn size='sm'>Save</FormBtn>
            </div>
          </form>
        }
      />
      <SettingsCard
        title='Project Status'
        description='Update the status of your project depending on what stage of the developing proccess is.'
        formChild={
          <form>
            <Select defaultValue={projectData?.status} name='status' required>
              <SelectTrigger id='status' className='bg-background-2'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active'>
                  <Badge text='Active' color='green' decorated />
                </SelectItem>
                <SelectItem value='mantainance'>
                  <Badge text='Mantainance' color='red' decorated />
                </SelectItem>
                <SelectItem value='inactive'>
                  <Badge text='Inactive' color='blue' decorated />
                </SelectItem>
              </SelectContent>
            </Select>
            <div className='flex items-center justify-end mt-2'>
              <FormBtn size='sm'>Save</FormBtn>
            </div>
          </form>
        }
      />
      <SettingsCard
        title='Avatar'
        description='Upload a custom image or emoji from your files.'
        formChild={
          <form className='flex items-center justify-between'>
            <div>
              <Label
                htmlFor='profileImg'
                className='flex px-3 items-center gap-4 cursor-pointer hover:underline'
              >
                <Avatar className='size-14'>
                  <AvatarImage src={projectData?.image} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                Choose image
              </Label>
              <Input
                className='hidden'
                type='file'
                accept='image/*'
                id='profileImg'
                name='profileImg'
              />
            </div>
            <FormBtn size='sm'>Upload</FormBtn>
          </form>
        }
      />
      <SettingsCard
        title='Invite Members'
        description='Send invitations to other users to join your project.'
        formChild={
          <form>
            <Input
              name='email'
              className='bg-background-2'
              type='text'
              placeholder='example@email.com'
            />
            <div className='flex items-center justify-end mt-2'>
              <FormBtn size='sm'>Send</FormBtn>
            </div>
          </form>
        }
      />
      <SettingsCard
        title='Delete Project'
        description='Permanently remove your project and all of its data from Profuctify.
        This action is not reversible.'
        danger
        formChild={<></>}
      />
    </ul>
  );
};

export default ProjectSettingsCards;
