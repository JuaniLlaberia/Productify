import { z } from 'zod';

export const ProjectFormSchema = z.object({
  name: z.string().min(1),
});

export const TaskFormSchema = z.object({
  projectId: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  tag: z.string(),
  status: z.string(),
  assignedTo: z.string(),
  dueDate: z.date(),
});
