'use server';

import { fetchMutation } from 'convex/nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { api } from '../../../convex/_generated/api';

export const updateUser = async (formData: FormData) => {
  const session = await getServerSession();

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

  await fetchMutation(api.users.updateUser, {
    userEmail: session?.user?.email!,
    data: {
      name,
      profileImg: imageUrl,
    },
  });
};

export const deleteUser = async (userEmail: string) => {
  await fetchMutation(api.users.deleteUser, { userEmail });

  cookies().delete('next-auth.session-token');
  redirect('/');
};
