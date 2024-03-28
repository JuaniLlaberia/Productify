'use client';

import { useQuery } from 'convex/react';

import DeleteUserModal from './delete-user-modal';
import SettingsCard from './settings-card';
import FormBtn from '@/components/form-btn';
import { api } from '../../../convex/_generated/api';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Label } from '../../components/ui/label';
import { updateUser } from '@/lib/actions/user-actions';

const SettingsCards = () => {
  const userData = useQuery(api.users.getAuthUser);

  return (
    <ul className='flex flex-col gap-4 p-3'>
      <SettingsCard
        title='Full Name'
        description='Please enter your full name that everyone is able to see.'
        formChild={
          <form action={updateUser}>
            <Input
              name='name'
              className='bg-background-2'
              defaultValue={userData?.name}
              type='text'
              placeholder='John Doe'
            />
            <div className='flex items-center justify-end mt-2'>
              <FormBtn size='sm'>Save</FormBtn>
            </div>
          </form>
        }
      />
      <SettingsCard
        title='Email'
        description={`The email address linked with your verification methods. It can't be
        modify.`}
        formChild={
          <>
            <Input
              readOnly
              className='bg-background-2'
              defaultValue={userData?.email}
              type='email'
              placeholder='example@email.com'
            />
            <div className='flex items-center justify-end mt-2'>
              <Button
                disabled
                size='sm'
              >
                Save
              </Button>
            </div>
          </>
        }
      />
      <SettingsCard
        title='Avatar'
        description='Upload a custom image or emoji from your files.'
        formChild={
          <form
            action={updateUser}
            className='flex items-center justify-between'
          >
            <div>
              <Label
                htmlFor='profileImg'
                className='flex px-3 items-center gap-4 cursor-pointer hover:underline'
              >
                <Avatar className='size-14'>
                  <AvatarImage src={userData?.profileImg} />
                  <AvatarFallback>{userData?.name.at(0)}</AvatarFallback>
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
        title='Delete Account'
        description='Permanently remove your account and all of its data from Profuctify.
        This action is not reversible.'
        danger
        formChild={<DeleteUserModal />}
      />
    </ul>
  );
};

export default SettingsCards;
