'use server';

import { getServerSession } from 'next-auth';
import { fetchMutation } from 'convex/nextjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { ProjectFormSchema, TaskFormSchema } from './schemas';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

export type State = {
  message?: string | null;
};

export const createProject = async (prevState: State, formData: FormData) => {
  const session = await getServerSession();

  const validatedFields = ProjectFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Missing project name',
    };
  }

  //Create project
  const projectId = await fetchMutation(api.projects.createProject, {
    name: validatedFields.data.name,
    userEmail: session?.user?.email!,
  });

  revalidatePath('/projects');
  redirect(`/projects/${projectId}/dashboard`);
};

//FIX USER ID
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

  await fetchMutation(api.projects.createTask, {
    ...validatedFields.data,
    importance,
    dueDate: validatedFields.data.dueDate.getMilliseconds(),
    assignedTo: 'j578w41a6ypn0k2zpvkgz9111s6nhajh',
  });
};
