import { getServerSession } from 'next-auth';
import { fetchMutation } from 'convex/nextjs';

import { Doc, Id } from '../../../convex/_generated/dataModel';
import { TaskFormSchema } from '../schemas';
import { api } from '../../../convex/_generated/api';

export const createTask = async (
  extraInfo: { projectId: Id<'projects'>; dueDate: Date | undefined },
  formData: FormData
) => {
  //Fields validation
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = TaskFormSchema.safeParse({
    ...rawFormData,
    dueDate: extraInfo.dueDate,
    projectId: extraInfo.projectId,
  });

  if (!validatedFields.success) return {};

  const importance = 'important';

  const data = {
    ...validatedFields.data,
    importance,
    dueDate: validatedFields.data.dueDate.getMilliseconds(),
  } as Doc<'tasks'>;

  await fetchMutation(api.tasks.createTask, {
    taskData: data,
    userEmail: 'juanillaberia2002@gmail.com',
  });
};

export const updateTask = async (
  extraInfo: {
    projectId: Id<'projects'>;
    dueDate: Date | undefined;
  },
  formData: FormData
) => {
  //Fields validation
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = TaskFormSchema.safeParse({
    ...rawFormData,
    dueDate: extraInfo.dueDate,
    projectId: extraInfo.projectId,
  });

  if (!validatedFields.success) return {};

  const data = {
    ...validatedFields.data,
    dueDate: validatedFields.data.dueDate.getMilliseconds(),
  } as Doc<'tasks'>;

  await fetchMutation(api.tasks.updateTask, {
    taskData: data,
    userEmail: 'juanillaberia2002@gmail.com',
  });
};

export const deleteTask = async (
  projectId: Id<'projects'>,
  taskId: Id<'tasks'>
) => {
  const session = await getServerSession();

  await fetchMutation(api.tasks.deleteTask, {
    projectId,
    taskId,
    userEmail: session?.user?.email!,
  });
};
