'use server';

import { auth } from '@clerk/nextjs';

export const getAuthToken = async () => {
  return (await auth().getToken({ template: 'convex' })) ?? undefined;
};
