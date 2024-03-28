'use server';

import { fetchMutation } from 'convex/nextjs';

import { ReferenceSchema } from '../schemas';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { getAuthToken } from '@/utils/getAuthToken';

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
  if (!validatedData.success) return {};

  //Token
  const token = await getAuthToken();

  await fetchMutation(
    api.references.createReference,
    {
      projectId: projectId as Id<'projects'>,
      referenceData: {
        ...validatedData.data,
      },
    },
    { token }
  );
};

export const updateReference = async (
  extraInfo: {
    refId: string;
    projectId: string;
    isPinned: boolean;
  },
  formData: FormData
) => {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedData = ReferenceSchema.omit({
    isPinned: true,
    projectId: true,
  }).safeParse({
    ...rawFormData,
    projectId: extraInfo.projectId,
  });

  if (!validatedData.success) return {};

  //Token
  const token = await getAuthToken();

  await fetchMutation(
    api.references.updateReference,
    {
      data: { ...validatedData.data, isPinned: extraInfo.isPinned },
      projectId: extraInfo.projectId as Id<'projects'>,
      referenceId: extraInfo.refId as Id<'references'>,
    },
    { token }
  );
};

export const deleteReference = async (data: {
  refId: Id<'references'>;
  projectId: Id<'projects'>;
}) => {
  //Token
  const token = await getAuthToken();

  await fetchMutation(
    api.references.deleteReference,
    {
      projectId: data.projectId,
      referenceId: data.refId,
    },
    { token }
  );
};
