import { getServerSession } from 'next-auth';
import { fetchMutation } from 'convex/nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { ProjectFormSchema } from '../schemas';
import { api } from '../../../convex/_generated/api';

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
