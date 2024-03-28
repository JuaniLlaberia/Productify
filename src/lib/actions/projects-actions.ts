import { fetchMutation } from 'convex/nextjs';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { ProjectFormSchema } from '../schemas';
import { api } from '../../../convex/_generated/api';
import { getAuthToken } from '@/utils/getAuthToken';

export type State = {
  message?: string | null;
};

export const createProject = async (prevState: State, formData: FormData) => {
  const validatedFields = ProjectFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Missing project name',
    };
  }

  //Token
  const token = await getAuthToken();

  //Create project
  const projectId = await fetchMutation(
    api.projects.createProject,
    {
      name: validatedFields.data.name,
    },
    { token }
  );

  redirect(`/projects/${projectId}/dashboard`);
};
