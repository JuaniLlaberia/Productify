'use server';

import { fetchMutation } from 'convex/nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { api } from '../../../convex/_generated/api';
import { getAuthToken } from '@/utils/getAuthToken';
import { clerkClient } from '@clerk/nextjs';

export const updateUser = async (formData: FormData) => {
  //Token
  const token = await getAuthToken();

  const name = (formData.get('name') as string) || undefined;
  const file = formData.get('profileImg') as File;

  let imageUrl: string | undefined;

  if (file) {
    const uploadUrl = await fetchMutation(api.users.generateUploadUrl);
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: file,
    });

    const { storageId } = await response.json();

    imageUrl = await fetchMutation(api.users.generateDownloadUrl, {
      storageId,
    });
  }

  await fetchMutation(
    api.users.updateUser,
    {
      data: {
        name,
        profileImg: imageUrl,
      },
    },
    { token }
  );
};

export const deleteUser = async () => {
  //Token
  const token = await getAuthToken();

  const clerkUserToDelete = await fetchMutation(
    api.users.deleteUser,
    {},
    { token }
  );

  //Delete user from clerk
  await clerkClient.users.deleteUser(clerkUserToDelete);

  redirect('/');
};
