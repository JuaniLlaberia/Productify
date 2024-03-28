import { fetchMutation } from 'convex/nextjs';

import { Doc, Id } from '../../../convex/_generated/dataModel';
import { TaskFormSchema } from '../schemas';
import { api } from '../../../convex/_generated/api';
import { getAuthToken } from '@/utils/getAuthToken';

export const createTask = async (
  extraInfo: { projectId: Id<'projects'> },
  formData: FormData
) => {
  //Fields validation
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = TaskFormSchema.safeParse({
    ...rawFormData,
    projectId: extraInfo.projectId,
  });

  if (!validatedFields.success) return {};

  //Token
  const token = await getAuthToken();

  const data = {
    ...validatedFields.data,
  } as Doc<'tasks'>;

  await fetchMutation(
    api.tasks.createTask,
    {
      taskData: data,
    },
    { token }
  );
};

export const updateTask = async (
  extraInfo: {
    taskId: string;
    projectId: Id<'projects'>;
  },
  formData: FormData
) => {
  //Fields validation
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = TaskFormSchema.safeParse({
    ...rawFormData,
    projectId: extraInfo.projectId,
  });

  if (!validatedFields.success) return {};

  //Token
  const token = await getAuthToken();

  const data = {
    ...validatedFields.data,
    _id: extraInfo.taskId,
  } as Doc<'tasks'>;

  await fetchMutation(
    api.tasks.updateTask,
    {
      taskData: data,
    },
    { token }
  );
};

export const deleteTask = async (
  projectId: Id<'projects'>,
  taskId: Id<'tasks'>
) => {
  //Token
  const token = await getAuthToken();

  await fetchMutation(
    api.tasks.deleteTask,
    {
      projectId,
      taskId,
    },
    { token }
  );
};
