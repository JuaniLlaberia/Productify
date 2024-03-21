'use client';

import { useQuery } from 'convex/react';

import UserSettingsCard from './UserSettingsCard';
import { api } from '../../convex/_generated/api';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';

const UserSettingsCards = ({ email }: { email: string }) => {
  const userData = useQuery(api.users.getUserByEmail, { email });

  return (
    <ul className='flex flex-col gap-4 p-3'>
      <UserSettingsCard
        title='Full Name'
        description='Please enter your full name that everyone is able to see.'
        formChild={
          <>
            <Input
              className='bg-background-2'
              defaultValue={userData?.name}
              type='text'
              placeholder='John Doe'
            />
            <div className='flex items-center justify-end mt-2'>
              <Button size='sm'>Save</Button>
            </div>
          </>
        }
        action={''}
      />
      <UserSettingsCard
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
        action={''}
      />
      <UserSettingsCard
        title='Avatar'
        description='Upload a custom image or emoji from your files.'
        formChild={
          <>
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
              id='profileImg'
              name='profileImg'
            />
          </>
        }
        action={''}
      />
      <UserSettingsCard
        title='Delete Account'
        description='Permanently remove your account and all of its data from Profuctify.
        This action is not reversible.'
        danger
        formChild={
          <div className='flex items-center justify-end mt-5'>
            <Button
              variant='destructive'
              size='sm'
            >
              Delete Account
            </Button>
          </div>
        }
        action={''}
      />
    </ul>
  );
};

export default UserSettingsCards;
