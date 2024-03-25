'use server';

import { fetchMutation } from 'convex/nextjs';

import { ReferenceSchema } from '../schemas';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { revalidatePath } from 'next/cache';

export const createReference = async (
  projectId: string,
  formData: FormData
) => {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedData = ReferenceSchema.omit({
    isPinned: true,
    projectId: true,
  }).safeParse({
    ...rawFormData,
    projectId,
  });
  if (!validatedData.success) {
    return;
  }

  await fetchMutation(api.references.createReference, {
    projectId: projectId as Id<'projects'>,
    referenceData: {
      ...validatedData.data,
    },
  });

  revalidatePath(`/projects/${projectId}/references`);
};

export const updateReference = async () => {};

export const deleteReference = async () => {
  console.log('TEST');
};
