import { z } from 'zod';

export const ProjectFormSchema = z.object({
  name: z.string().min(1, 'Missing project name'),
});

export const TaskFormSchema = z.object({
  projectId: z.string().optional(),
  title: z.string().min(1, 'Missing require value/s'),
  description: z.string().min(1, 'Missing require value/s'),
  tag: z.enum(['feature', 'fix', 'refactor', 'test', 'deploy']),
  status: z.enum(['pending', 'progress', 'finished']),
  assignedTo: z.string().min(1, 'Missing require value/s'),
  importance: z.enum(['p-0', 'p-1', 'p-2', 'p-3', 'p-4']),
});

export const MessageSchema = z.object({
  data: z.string().min(1),
});

export const ReferenceSchema = z.object({
  name: z.string().min(1, 'Missing reference name'),
  type: z.enum(['github', 'gitlab', 'stackoverflow', 'documentation', 'other']),
  reference: z
    .string()
    .min(1, 'Missing reference url')
    .url('Invalid format. Must be an url'),
  isPinned: z.optional(z.boolean()),
});

export const reportsSchema = z.object({
  name: z.string().min(1, 'Missing bug report name'),
  type: z.enum(['ui/ux', 'functional', 'performance', 'security', 'other']),
  importance: z.enum(['p-0', 'p-1', 'p-2', 'p-3', 'p-4']),
  description: z.string().min(1, 'Missing bug report description'),
});
