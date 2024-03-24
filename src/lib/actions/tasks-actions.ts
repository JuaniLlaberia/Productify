import { getServerSession } from 'next-auth';
import { fetchMutation } from 'convex/nextjs';

import { Id } from '../../../convex/_generated/dataModel';
import { TaskFormSchema } from '../schemas';
import { api } from '../../../convex/_generated/api';

export const createTask = async (
  extraInfo: { projectId: Id<'projects'>; dueDate: Date | undefined },
  formData: FormData
) => {
  const session = await getServerSession();

  //Fields validation
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = TaskFormSchema.safeParse({
    ...rawFormData,
    dueDate: extraInfo.dueDate,
    projectId: extraInfo.projectId,
  });

  if (!validatedFields.success) return {};

  const importance = 'important';

  await fetchMutation(api.tasks.createTask, {
    taskData: {
      ...validatedFields.data,
      importance,
      dueDate: validatedFields.data.dueDate.getMilliseconds(),
      assignedTo: 'j578w41a6ypn0k2zpvkgz9111s6nhajh',
    },
    userEmail: session?.user?.email!,
  });
};

export const updateTask = async (
  extraInfo: {
    projectId: Id<'projects'>;
    dueDate: Date | undefined;
    taskId: Id<'tasks'>;
  },
  formData: FormData
) => {
  const session = await getServerSession();

  //Fields validation
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = TaskFormSchema.safeParse({
    ...rawFormData,
    dueDate: extraInfo.dueDate,
    projectId: extraInfo.projectId,
  });

  if (!validatedFields.success) return {};

  await fetchMutation(api.tasks.updateTask, {
    taskData: {
      _id: extraInfo.taskId,
      ...validatedFields.data,
      dueDate: validatedFields.data.dueDate.getMilliseconds(),
      importance: 'important',
      assignedTo: 'j578w41a6ypn0k2zpvkgz9111s6nhajh',
    },
    userEmail: session?.user?.email!,
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
