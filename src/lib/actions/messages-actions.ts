'use server';

import { fetchMutation } from 'convex/nextjs';

import { MessageSchema } from '../schemas';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

export const sendMessage = async (
  projectId: Id<'projects'>,
  formData: FormData
) => {
  const validatedData = MessageSchema.safeParse({ data: formData.get('data') });
  if (!validatedData.success) return;

  const newMessage = {
    data: validatedData.data.data,
    projectId,
  };

  await fetchMutation(api.messages.sendMessage, newMessage);
};
